import Link from "next/link";
import styles from "../styles/title-page.module.css";
export default function TitlePage() {
    return (
      < >
        <div className=" h-screen border-b border-gray-500 last:border-none flex w-7/12 mb-4b">

            <div className="flex flex-col content-center justify-center p-20">

              <h2 className="text-5xl font-bold font-['Poppins'] px-1 py-1 text-light-gray">
                 Westmount Coding Club
             </h2>

              <p className="text-1xl font-medium font-['Poppins']  py-1 text-light-gray">
                  
              The Westmount Coding
              Club is a place to meet like-
              minded individuals that love
              to code.
                 
              </p>
              <a href="#announcement" className="pt-10 flex content-center justify-center">
              
                  <button className="text-2xl w-full text pb-0.5 h-10 bg-royal-blue text-light-gray font-bold rounded-full font-['Poppins']">
                  
                  Announcements
                  
                  </button>
                </a>

                <Link href="/login">
                <a className = "pt-5">
                    <button className="text-2xl w-full text pb-0.5 h-10 bg-royal-blue text-light-gray font-bold rounded-full font-['Poppins']">
                        Sign In
                    </button>
                </a>
                </Link>
    </div>

          <div className="">
              <object className="h-screen pl-20 " type="image/svg+xml" data="/Programming-amico.svg"></object>
          </div>
         
      </div>
      <div className={styles.svgHero}>
        <object
          type="image/svg+xml"
          data="/Programming-amico.svg"
        ></object>
        </div>
    </>
  );
}
