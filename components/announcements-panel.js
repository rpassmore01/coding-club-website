import Announcement from "./announcement";

function AnnouncementsPanel(props) {
  return (
    <div>
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
            ></Announcement>
          );
        })
      )}
    </div>
  );
}



export default AnnouncementsPanel
