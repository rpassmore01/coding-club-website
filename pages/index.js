import axios from "axios";
import { useEffect, useState } from "react";
import { Announcement } from "../schema.ts";
import AnnouncementsPanel from "../components/announcements-panel";
import styles from "../styles/announcement-panel.module.css";
import TitlePage from "../components/title-page";

export default function Home({ announcements }) {
  return (
    <div>
      <TitlePage></TitlePage>
      <AnnouncementsPanel
        announcements={JSON.parse(announcements)}
        delete={false}
      ></AnnouncementsPanel>
    </div>
  );
}

export async function getServerSideProps(context) {
  const announcements = JSON.stringify(await Announcement.find().lean());
  return {
    props: {
      announcements,
    },
  };
}
