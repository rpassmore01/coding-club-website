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
          return (
            <Announcement
              title={item.title}
              name={item.name}
              date={item.date}
              body={item.body}
              key={index}
              delete={props.delete}
              id={item._id}
            ></Announcement>
          );
        })
      )}
    </div>
  );
}



export default AnnouncementsPanel
