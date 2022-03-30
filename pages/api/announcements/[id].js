const ObjectId = require('mongodb').ObjectId;

const { connectToDatabase } = require("../../../middleware/mongodb");
import AnnouncementSubmission from "../../../classes/announcementSubmission";

export default async function handler(req, res) {
  const db = await connectToDatabase();
  switch (req.method) {
    case "GET": {
      return getAnnouncement(req, res, db);
    }
    case "DELETE": {
      return deleteAnnouncement(req, res, db);
    }
  }
}

async function getAnnouncement(req, res, db) {
  let id;
  try {
    id = req.query.id;
    console.log(`GET ${id}`);
    id = new ObjectId(id);
  } catch (err) {
    return res.status(400).json({
      message: new Error(err).message,
      success: false,
    });
  }
  try {
    const announcement = await db
      .collection("announcements")
      .findOne({ _id: id });
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
  } catch (err) {
    return res.status(500).json({
      message: new Error(err).message,
      success: false,
    });
  }
}

async function deleteAnnouncement(req, res, db) {
  let id;
  try {
    id = req.query.id;
    console.log(`DELETE ${id}`);
    id = new ObjectId(id);
  } catch (err) {
    return res.status(400).json({
      message: new Error(err).message,
      success: false,
    });
  }
  try {
    const { deletedCount } = await db.collection("announcements").deleteOne({ _id: id });
    if (deletedCount > 0) {
      return res.status(200).json({
	success: true,
      });
    } else {
      return res.status(404).json({
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: new Error(err).message,
      success: false,
    });
  }
}
