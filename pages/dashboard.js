import AnnouncementForm from "../components/announcement-form";
import AnnouncementsPanel from "../components/announcements-panel";
import { Announcement, Session } from "../schema.ts";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

export default function Dashboard({ announcements, authorized, csrf_token }) {
  const router = useRouter();

  useEffect(() => {
    if (!authorized) router.push("/login");
  });

  function refreshData() {
    router.replace(router.asPath);
  }

  function logout() {
    axios
      .delete("/api/password", {})
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (authorized) {
    return (
      <div>
        <AnnouncementForm
          refreshData={() => refreshData()}
          token={csrf_token}
        ></AnnouncementForm>
        <div className="pt-2 pb-2">
          <button
            className="text-l w-40 text bg-royal-blue text-light-gray font-bold rounded-full font-['Poppins']"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <AnnouncementsPanel
          refreshData={() => refreshData()}
          announcements={JSON.parse(announcements)}
          delete={true}
        ></AnnouncementsPanel>
      </div>
    );
  } else {
    return <p>Redirecting...</p>;
  }
}

export async function getServerSideProps(context) {
  let authorized = false;
  let csrf_token = null;
  const session = await Session.find({
    session_id: context.req.cookies.session_id,
  }).lean();
  const announcements = JSON.stringify(await Announcement.find().lean());
  if (session[0]) {
    authorized = true;
    csrf_token = session[0].csrf_token;
  }
  return {
    props: {
      announcements,
      authorized: authorized,
      csrf_token: csrf_token,
    },
  };
}
