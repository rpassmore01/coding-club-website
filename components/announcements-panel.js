import Announcement from "./announcement";
import styles from "../styles/announcement-panel.module.css";
import { useState } from "react";

function AnnouncementsPanel(props) {
  const [numAnnouncements, setNumAnnouncements] = useState(5);
  const [showMoreText, setShowMoreText] = useState(true);

  function showMore(){
    if(props.announcements.length > numAnnouncements){
      setNumAnnouncements(props.announcements.length)
      setShowMoreText(false);
    }
    else{
      setNumAnnouncements(5);
      setShowMoreText(true)
    }
  }

    return (
            <div className={styles.mainPanel}>
                
                <h2 className="self-start pl-7 text-4xl font-bold pt-2 pb-2 font-['Poppins']">Announcments:
                    
                </h2>
                
      <div className={styles.innerPanel}>
        {props.announcements == null ? (
          <p>No Announcements to Display...</p>
        ) : (
          props.announcements.map((item, index) => {
            if(index < numAnnouncements){
              return (
                  
                <Announcement
                  title={item.title}
                  name={item.name}
                  date={item.date}
                  body={item.body}
                  key={index}
                  delete={props.delete}
                  id={item._id}
                  refreshData={() => props.refreshData()}
                        ></Announcement>
            );
              }
          })
        )}
        <button onClick={showMore}>{showMoreText ? "Show more": "Show Less"}</button>
      </div>
            </div>
  );
}

export default AnnouncementsPanel;
