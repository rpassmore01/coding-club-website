import AnnouncementSubmission from "../../classes/announcementSubmission";
import { Announcement, Session } from "../../schema.ts";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getAnnouncements(req, res);
    }
    case "POST": {
      return addAnnouncement(req, res);
    }
  }
}

async function getAnnouncements(req, res) {
  const announcements = await Announcement.find().lean();
  return res.status(200).json({
    data: announcements,
    success: true,
  });
}

async function addAnnouncement(req, res) {
  const session = await Session.find({session_id: req.cookies.session_id}).lean();
  if(session[0] && req.cookies.csrf_token == session[0].csrf_token){
    let submission;
  try {
    submission = AnnouncementSubmission.parse(req.body);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }

  const announcement = new Announcement({
    name: submission.name,
    title: submission.title,
    body: submission.body,
    date: Date.now(),
  });
  await announcement.save();
  return res.status(200).json({
    data: announcement,
    success: true,
  });
  }
  else {
    res.status(401).json({
      success: false,
      error: "No valid session or csrf token."
    })
  }
}
