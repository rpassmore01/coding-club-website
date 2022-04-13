import AnnouncementForm from "../components/announcement-form";
import AnnouncementsPanel from "../components/announcements-panel";

export default function Dashboard({ data }) {
  return (
    <div>
      <AnnouncementForm></AnnouncementForm>
      <AnnouncementsPanel data={data} delete={true}></AnnouncementsPanel>
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
