import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/header";
import Register from "./components/Register";

function App() {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCkeck, setUserPasswordCkeck] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : {};
  })
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userEmail === registeredUser.email || userPassword === registeredUser.password) {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect user email or password");
      console.log(`Typed email: ${userEmail}`);
      console.log(`Typed password: ${userPassword}`);
      console.log(`Needed email: ${registeredUser.email}`);
      console.log(`Needed password: ${registeredUser.password}`);

      return;
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();

    if (userPassword !== userPasswordCkeck && userPassword.length < 8) {
      alert("Password is too weak or doesn't match");
      return;
    };

    const registered = {
      name: username,
      password: userPassword,
      email: userEmail
    }
    setRegisteredUser(registered);
    setIsRegistering(false);
    console.log(registeredUser);

    localStorage.setItem("user", JSON.stringify(registered));

  }

  if (isRegistering) {
    return <Register
      setIsRegistering={setIsRegistering}
      handleRegister={handleRegister}
      setUsername={setUsername}
      setUserPassword={setUserPassword}
      setUserEmail={setUserEmail}
      setUserPasswordCkeck={setUserPasswordCkeck}
    />
  }

  if (isLoggedIn) {
    return (<><Header />
      <Home /></>)
  }

  return (
    <>
      <Login
        userEmail={userEmail}
        userPassword={userPassword}
        setUserEmail={setUserEmail}
        setUserPassword={setUserPassword}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        submit={handleSubmit}
        setIsRegistering={setIsRegistering}
      />
    </>
  )
}

export default App
