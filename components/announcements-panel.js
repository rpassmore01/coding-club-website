import Announcement from "./announcement";
import styles from "../styles/announcement-panel.module.css";

function AnnouncementsPanel(props) {
    return (
       
        <a id="announcement">
            
            <div className={styles.mainPanel}>
                
                <h2 className="self-start pl-7 text-4xl font-bold pt-2 pb-2 font-['Poppins']">Announcments:
                    
                </h2>
                
      <div className={styles.innerPanel}>
        {props.announcements == null ? (
          <p>No Announcements to Display...</p>
        ) : (
          props.announcements.map((item, index) => {
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
          })
        )}
      </div>
            </div>
            </a>
  );
}

export default AnnouncementsPanel;
