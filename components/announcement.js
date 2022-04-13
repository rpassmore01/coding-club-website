import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Announcement(props) {

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
        location.reload()
      }
    ).catch(
      (err) => console.log(err)
    )
  }
  
  return (
    <div className="border-solid border-2 border-black flex flex-col w-10/12">
      <h2 className="text-3xl font-bold">{props.title}</h2>
      <h4 className="text-base">
        {props.name} posted on {date}
      </h4>
      <p className="text-lg">{props.body}</p>
      {props.delete ? <button onClick={removeAnnouncement} className="text-red-500">Remove Announcement</button> : <p></p>}
    </div>
  );
}
