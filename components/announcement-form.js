import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";

export default function AnnouncementForm() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  function submitForm(event) {
    axios.post("/api/announcements", {
      title: title,
      name: name,
      body: message,
    });
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            required
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-solid border-2 border-black"
          ></input>
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            required
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-solid border-2 border-black"
          ></input>
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <br />
          <input
            required
            name="body"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-solid border-2 border-black"
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
