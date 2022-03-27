import styles from "../styles/Home.module.css";

export default function Announcement(props) {
  return (
    <div className="border-solid border-2 border-black flex flex-col w-10/12">
      <h2 className="text-3xl font-bold">{props.tittle}</h2>
      <h4 className="text-base">
        {props.name} posted on {props.date}
      </h4>
      <p className="text-lg">{props.body}</p>
    </div>
  );
}
