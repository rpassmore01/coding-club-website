import axios from "axios";
import { useEffect, useState } from "react";
import { Announcement } from "../schema.ts";
import AnnouncementsPanel from "../components/announcements-panel";
import styles from "../styles/announcement-panel.module.css"

export default function Home({ announcements }) {
  return (
    <div>
      <div className="h-24"></div>
      <div className={styles.wave}>
      <AnnouncementsPanel announcements={JSON.parse(announcements)} delete={false}></AnnouncementsPanel>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const announcements = JSON.stringify(await Announcement.find().lean());
  return {
    props: {
      announcements
    }
  };
}
