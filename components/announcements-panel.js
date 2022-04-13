import styles from "../styles/Home.module.css";
import axios from "axios";
import Announcement from "./announcement";

function AnnouncementsPanel({ announcements }) {
  return (
    <div>
      {announcements == null ? (
        <p>No Announcements to Display...</p>
      ) : (
        announcements.map((item, index) => {
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
