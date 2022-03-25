import styles from "../styles/Home.module.css";

export default function Announcement(props) {
  return (
    <div>
      <h2>{props.tittle}</h2>
      <h4>{props.name}</h4>
      <p>{props.body}</p>
      <p>{props.date}</p>
    </div>
  );
}
