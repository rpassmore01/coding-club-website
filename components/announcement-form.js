import axios from "axios";
import { useState } from "react";

export default function AnnouncementForm(props) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  function submitForm(event) {
    event.preventDefault();
    setName("");
    setTitle("");
    setMessage("");

    axios
      .post("/api/announcements", {
        title: title,
        name: name,
        body: message,
      })
      .then((res) => props.refreshData())
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={(e) => submitForm(e)}>
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
