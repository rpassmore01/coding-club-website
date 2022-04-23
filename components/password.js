import axios from "axios";
import { useState } from "react";

export default function Password(props) {
  const [password, setPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  function FormSubmit(event) {
    event.preventDefault();
    setPassword("");

    axios
      .post("/api/password", {
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          props.setLoggedIn(res.data.success);
        } else {
          setIncorrectPassword(true);
        }
      })
      .catch((err) => console.log(err));
  }

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
        <input type="submit"></input>
      </form>
      {incorrectPassword ? (
        <p className="text-red-500">The password you entered is incorrect.</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
