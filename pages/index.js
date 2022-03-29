import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Announcement from "../components/announcement";

export default function Home() {
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    axios.get("/api/announcements").then((res) => {
      setAnnouncements(res.data);
    });
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
