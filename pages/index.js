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
      setAnnouncements(res);
    });
  }, []);

  return (
    <div>
      {announcements == null ? (
        <p></p>
      ) : (
        <Announcement
          tittle={announcements.data[5].tittle}
          name={announcements.data[5].name}
          body={announcements.data[5].body}
          date={announcements.data[5].date}
        ></Announcement>
      )}
    </div>
  );
}
