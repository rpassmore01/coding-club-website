import { Announcement, Session } from "../../../schema.ts";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getAnnouncement(req, res);
    }
    case "DELETE": {
      return deleteAnnouncement(req, res);
    }
  }
}

async function getAnnouncement(req, res) {
  let id;
  try {
    id = req.query.id;
    console.log(`GET ${id}`);
  } catch (err) {
    return res.status(400).json({
      message: new Error(err).message,
      success: false,
    });
  }

  const announcement = await Announcement.findById(id).lean();
  if (announcement !== null) {
    return res.status(200).json({
      data: announcement,
      success: true,
    });
  } else {
    return res.status(404).json({
      success: false,
    });
  }
}

async function deleteAnnouncement(req, res) {
  const session = await Session.find({session_id: req.cookies.session_id}).lean();
  if(session[0]){
    let id;
  try {
    id = req.query.id;
    console.log(`DELETE ${id}`);
  } catch (err) {
    return res.status(400).json({
      message: new Error(err).message,
      success: false,
    });
  }

  await Announcement.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
  });
  }
  else {
    return res.status(401).json({
      success: false,
      message: "No authorized session found."
    })
  }
}
