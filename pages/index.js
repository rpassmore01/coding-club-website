import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    axios.get("/api/announcements").then((res) => {
      setAnnouncements(res);
      console.log(res);
    });
  }, []);

  return <div></div>;
}
