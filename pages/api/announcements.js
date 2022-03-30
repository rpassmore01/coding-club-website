const { connectToDatabase } = require("../../middleware/mongodb");
import AnnouncementSubmission from "../../classes/announcementSubmission";

export default async function handler(req, res) {
  const db = await connectToDatabase();
  switch (req.method) {
    case "GET": {
      return getAnnouncements(req, res, db);
    }
    case "POST": {
      return addAnnouncements(req, res, db);
    }
  }
}

async function getAnnouncements(req, res, db) {
  try {
    const announcements = await db
      .collection("announcements")
      .find({})
      .toArray();
    return res.status(200).json({
      data: announcements,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: new Error(err).message,
      success: false,
    });
  }
}

async function addAnnouncements(req, res, db) {
  let submission;
  try {
    submission = AnnouncementSubmission.parse(req.body);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }
  try {
    await db.collection("announcements").insertOne(submission);
    return res.status(200).json({
      data: submission,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: new Error(err).message,
      success: false,
    });
  }
}
