import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";

export default function AnnouncementForm() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  function submitForm() {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    axios.post("/api/announcements", {
      title: title,
      name: name,
      body: message,
      date: today.toLocaleDateString(undefined, options),
      announcement: true,
    });
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <h2>Name:</h2>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="border-solid border-2 border-black"
        ></input>
        <h2>Title:</h2>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="border-solid border-2 border-black"
        ></input>
        <h2>Body:</h2>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          className="border-solid border-2 border-black"
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}
