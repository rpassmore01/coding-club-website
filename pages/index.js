import AnnouncementsPanel from "../components/announcements-panel";

export default function Home({ data }){
    return (
        <div>
            <AnnouncementsPanel data={data} delete={false}></AnnouncementsPanel>
        </div>
    )
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