import AnnouncementForm from "../components/announcement-form";
import AnnouncementsPanel from "../components/announcements-panel";
import { Announcement } from "../schema.ts";

export default function Dashboard({ announcements }) {
  return (
    <div>
      <AnnouncementForm></AnnouncementForm>
      <AnnouncementsPanel announcements={JSON.parse(announcements)} delete={true}></AnnouncementsPanel>
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
