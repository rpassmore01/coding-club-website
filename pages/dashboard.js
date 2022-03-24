import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";

// add some cool comments
//Comment
// Comment

export default function Home() {
  const [text, setText] = useState("");

  function submitForm() {
    axios.post("/api/announcements", {
      text: text,
    });
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="text" onChange={(e) => setText(e.target.value)}></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}
