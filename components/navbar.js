export default function Navbar(){
    return(
        <div className="flex justify-between text-light-gray">
            <h2 className="text-4xl font-bold font-['Poppins']">&lt;WCC /&gt;</h2>
            <div className="flex w-1/3 justify-evenly text-2xl">
                <a href="#announcements">Announcements</a>
                <a>About</a>
            </div>
        </div>
    )
}