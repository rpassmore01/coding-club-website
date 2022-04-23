import axios from "axios";
import styles from"../styles/announcement.module.css"
import useClickOutside from "../hooks/useOutsideClick";

export default function Announcement(props) {
  const { ref, isComponentVisible, setIsComponentVisible } = useClickOutside(false);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = (new Date(props.date)).toLocaleDateString(undefined, options);

  const removeAnnouncement = () => {
    axios.delete(`/api/announcements/${props.id}`).then(
      (res) => {
        props.refreshData()
      }
    ).catch(
      (err) => console.log(err)
    )
  }
  
  return (
    <div className=" border-b-[1px] border-gray-500 last:border-none flex flex-col w-10/12 mb-4">
      <h2 className="text-3xl font-medium px-1 py-1 bg-med-blue rounded-md w-fit">{props.title}</h2>
      <h4 className="text-base text-light-gray">
        {props.name} posted on {date}
      </h4>
      <p className="text-lg">{props.body}</p>
      <div>
      {props.delete ? <button onClick={()=>setIsComponentVisible(true)} className="text-red">Remove Announcement</button> : <p></p>}
      {isComponentVisible ? 
      <div className={styles.popup} ref={ref}>
        <p >Delete announcement?</p>
        <div className="flex justify-evenly">
        <button onClick={() => {
          removeAnnouncement()
          setIsComponentVisible(false)
        }}>Yes</button>
        <button onClick={()=>setIsComponentVisible(false)}>No</button>
        </div>
      </div> 
      : <p></p>}
      </div>
    </div>
  );
}
