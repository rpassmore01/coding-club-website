import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Announcement from "../components/announcement";

function Home({ data }) {
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    setAnnouncements(data)
  }, []);

  return (
    <div>
      {announcements == null ? (
        <p>No Announcements to Display...</p>
      ) : (
        announcements.data.map((item, index) => {
          console.log(item.title);
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

export async function getStaticProps(){
  
  const res = await fetch("http://localhost:3000/api/announcements")
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

export default Home
