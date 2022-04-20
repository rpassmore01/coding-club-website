import axios from "axios";
import { useState } from "react";
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
    <div className="border-solid border-2 border-black flex flex-col w-10/12">
      <h2 className="text-3xl font-bold">{props.title}</h2>
      <h4 className="text-base">
        {props.name} posted on {date}
      </h4>
      <p className="text-lg">{props.body}</p>
      <div>
      {props.delete ? <button onClick={()=>setIsComponentVisible(true)} className="text-red-500">Remove Announcement</button> : <p></p>}
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
