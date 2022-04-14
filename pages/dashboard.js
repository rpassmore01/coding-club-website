import { useState } from "react";
import AnnouncementForm from "../components/announcement-form";
import AnnouncementsPanel from "../components/announcements-panel";
import { Announcement } from "../schema.ts";
import Password from "../components/password";

export default function Dashboard({ announcements }) {
  const [loggedIn, setLoggedIn] = useState(false);
  if(loggedIn){
    return (
      <div>
        <AnnouncementForm></AnnouncementForm>
        <AnnouncementsPanel announcements={JSON.parse(announcements)} delete={true}></AnnouncementsPanel>
      </div>
    );
  }
  else {
    return(
      <Password setLoggedIn={(e) => setLoggedIn(e)} />
    )
  }
  
}

export async function getServerSideProps(context) {
  const announcements = JSON.stringify(await Announcement.find().lean());
  return {
    props: {
      announcements
    }
  };
}
