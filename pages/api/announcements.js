import AnnouncementSubmission from "../../classes/announcementSubmission";
import { Announcement } from "../../schema.ts";

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

  const announcement = new Announcement({ name: submission.name, title: submission.title, body: submission.body, date: Date.now() });
  await announcement.save();
  return res.status(200).json({
    data: announcement,
    success: true,
  });

}
