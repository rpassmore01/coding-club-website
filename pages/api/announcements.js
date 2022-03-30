const { connectToDatabase } = require("../../middleware/mongodb");

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

class AnnouncementSubmission {
  /**
   * The title of the announcement.
   */
  title;

  /**
   * The author of the announcement.
   */
  name;

  /**
   * The content of the announcement.
   */
  body;

  /**
   * The date of the announcement.
   */
  date;

  constructor(title, name, body, date) {
    this.title = title;
    this.name = name;
    this.body = body;
    this.date = date;
  }

  static parse(obj) {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = today.toLocaleDateString(undefined, options);

    if (obj === null || obj.constructor !== Object) {
      throw new Error("Bad submission: must be an object");
    }

    if (!obj.hasOwnProperty("title")) {
      throw new Error("Bad submission: title must be present");
    } else if (obj.title === null || obj.title.constructor !== String) {
      throw new Error("Bad submission: title must be a String");
    }
    const title = obj.title.trim();
    delete obj.title;
    if (title.length == 0) {
      throw new Error("Bad submission: title must be non-empty");
    }

    if (!obj.hasOwnProperty("name")) {
      throw new Error("Bad submission: name must be present");
    } else if (obj.name === null || obj.name.constructor !== String) {
      throw new Error("Bad submission: name must be a String");
    }
    const name = obj.name.trim();
    delete obj.name;
    if (name.length == 0) {
      throw new Error("Bad submission: name must be non-empty");
    }

    if (!obj.hasOwnProperty("body")) {
      throw new Error("Bad submission: body must be present");
    } else if (obj.body === null || obj.body.constructor !== String) {
      throw new Error("Bad submission: body must be a String");
    }
    const body = obj.body.trim();
    delete obj.body;
    if (body.length == 0) {
      throw new Error("Bad submission: body must be non-empty");
    }

    if (Object.getOwnPropertyNames(obj).length !== 0) {
      throw new Error(
        `Bad submission: unexpected properties: ${Object.getOwnPropertyNames(
          obj
        )}`
      );
    }

    return new AnnouncementSubmission(title, name, body, date);
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
