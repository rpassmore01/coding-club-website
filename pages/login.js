import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Session } from "../schema.ts";

export default function Password({ authorized }) {
    
  const [password, setPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const router = useRouter();

    function FormSubmit(event) {
        
    event.preventDefault();
    setPassword("");

    axios
      .post("/api/password", {
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          router.push("/dashboard")
        } else {
          setIncorrectPassword(true);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if(authorized) router.push("/dashboard")
  })

        
    return (
        
      <div>
          
      <form onSubmit={(e) => FormSubmit(e)}>
        <label htmlFor="password">Enter Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-solid border-2 border-black"
        />
        <br />

              <div class = "pt-2"><input class="text-l w-40 text bg-royal-blue text-light-gray font-bold rounded-full font-['Poppins']" type="submit"></input></div>
      </form>
      {incorrectPassword ? (
        <p className="text-red-500">The password you entered is incorrect.</p>
      ) : (
        <p></p>
              )}
             
            </div>
         
      );
}

export async function getServerSideProps(context){
  let authorized = false;
  if(context.req.cookies.session_id && context.req.cookies.csrf_token){
    const sessionExsists = await Session.exists({session_id: context.req.cookies.session_id});
    if(sessionExsists){
    authorized = true
    } 
  }
  return {
    props: {
      authorized: authorized,
    },
  };
        
}
