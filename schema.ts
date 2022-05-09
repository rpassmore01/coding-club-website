import mongoose from "mongoose";
import { GlobalRef } from "./global.ts";

const obj = new GlobalRef('ccw.schemas');

if (obj.value === undefined) {
  obj.value = Object.freeze({
    Announcement: mongoose.model('Announcement', new mongoose.Schema({
      title: { type: String, required: true },
      name: { type: String, required: true },
      body: { type: String, required: true },
      date: { type: Date, required: true }

    })),
    Session: mongoose.model('Session', new mongoose.Schema({
      session_id: {type: String, required: true},
      csrf_token: {type: String, required: true},
      //Moves time back 4 hours because function returns time in GMT
      createdAt: {type: Date, expires: 900, default: Date.now()}
    }))
  });
}

module.exports = obj.value;
