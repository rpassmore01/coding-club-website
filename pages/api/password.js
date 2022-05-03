const bcrypt = require("bcrypt");
const uid = require("uid-safe");
import { Session } from "../../schema.ts"
import cookie from "cookie";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      return await checkPassword(req, res);
    }
    case "DELETE": {
      return await logout(req, res);
    }
  }
}

async function logout(req, res){
  const session = await Session.find({session_id: req.cookies.session_id})
  if(session[0]){
    try{
      console.log(`DELETE ${session[0]._id}`);
      await Session.findByIdAndDelete(session[0]._id);
      return res.status(200).json({
        success: true
      })
    }catch(err){
      return res.status(400).json({
        success: false,
        message: err
      })
    }
  }
}

async function checkPassword(req, res) {
  if (req.body.password) {
    const result = await bcrypt.compare(
      req.body.password,
      process.env.PASSWORD
    );
    if (result) {
      try {
        const sessionId = await uid(20);
        const csrfToken = await uid(20);
        const session = new Session({
          session_id: sessionId,
          csrf_token: csrfToken
        })
        await session.save();
        res.setHeader("Set-Cookie", [
          cookie.serialize("session_id", sessionId, {
          httpOnly: true,
          maxAge: 60 * 15,
          sameSite: "strict",
          path: "/"
        }),
        cookie.serialize("csrf_token", csrfToken, {
          httpOnly: true,
          maxAge: 60 * 15,
          sameSite: "strict",
          path: "/"
        })])
      }
      catch(err) {
        return res.status(500).json({
          success: false,
          error: err
        })
      }
      return res.status(200).json({
        success: true,
      });
    } else {
      return res.status(401).json({
        success: false,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: new Error(
        "Bad Submission: Request has no attribute for password"
      ),
    });
  }
}
