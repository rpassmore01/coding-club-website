export default class AnnouncementSubmission {
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

  constructor(title, name, body) {
    this.title = title;
    this.name = name;
    this.body = body;
  }

  static parse(obj) {
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

    if (!obj.hasOwnProperty("token")) {
      throw new Error("Bad submission: token must be present");
    } else if (obj.token === null || obj.token.constructor !== String) {
      throw new Error("Bad submission: token must be a String");
    }
    const token = obj.token.trim();
    delete obj.token;
    if (token.length == 0) {
      throw new Error("Bad submission: body must be non-empty");
    }

    if (Object.getOwnPropertyNames(obj).length !== 0) {
      throw new Error(
        `Bad submission: unexpected properties: ${Object.getOwnPropertyNames(
          obj
        )}`
      );
    }

    return new AnnouncementSubmission(title, name, body);
  }
}
