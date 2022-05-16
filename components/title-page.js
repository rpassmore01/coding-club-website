import styles from "../styles/title-page.module.css";
export default function TitlePage() {
  return (
    <div className={styles.titleContainer}>
      <div className="flex flex-col content-center justify-center p-20 text-light-gray" >
        <h2 className="text-6xl font-bold font-['Poppins'] px-1 py-1 text-center lg:text-left">
          Westmount Coding Club
        </h2>

        <p className="text-1xl font-medium font-['Poppins']  py-1 text-center lg:text-left">
          The Westmount Coding Club is a place to meet like- minded individuals
          that love to code.
        </p>
        <a
          href="#announcements"
          className="pt-10 flex justify-center lg:block"
        >
          <button className="text-2xl w-full text pb-0.5 h-10 bg-royal-blue font-bold rounded-full font-['Poppins'] w-2/3">
            Announcements
          </button>
        </a>

        <a href="http://localhost:3000/login" className="pt-5 flex justify-center lg:block">
          <button className="text-2xl w-full text pb-0.5 h-10 bg-royal-blue font-bold rounded-full font-['Poppins'] w-2/3">
            Sign In
          </button>
        </a>
      </div>
      <div className={styles.svgHero}>
        <object
          type="image/svg+xml"
          data="/Programming-amico.svg"
        ></object>
        </div>
  
    </div>
  );
}
