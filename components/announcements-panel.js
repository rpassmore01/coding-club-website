import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Announcement from "./announcement";

function AnnouncementsPanel(props) {
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    setAnnouncements(props.data)
  }, []);

  return (
    <div>
      {announcements == null ? (
        <p>No Announcements to Display...</p>
      ) : (
        announcements.data.map((item, index) => {
          console.log(item.title);
          return (
            <Announcement
              title={item.title}
              name={item.name}
              date={item.date}
              body={item.body}
              key={index}
            ></Announcement>
          );
        })
      )}
    </div>
  );
}



export default AnnouncementsPanel
