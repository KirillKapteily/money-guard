import { useState, useEffect } from "react";
import { Chart } from "chart.js";
import styles from "./styles/body.module.scss";
import registerBg from "./assets/register-background.png";
import loginBg from "./assets/login-background.png";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/header";
import Register from "./components/Register";
import Logout from "./components/Logout";

function App() {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCkeck, setUserPasswordCkeck] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [validatePassword, setValidatePassword] = useState("none");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : {};
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const specialSymbols = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "+",
  ];
  const hasSpecialSymbol = specialSymbols.some((symbol) =>
    userPassword.includes(symbol),
  );

  useEffect(() => {
    if (isRegistering) {
      document.body.style.backgroundImage = `url(${registerBg})`
      console.log("MONEY");
    } else {
       document.body.style.backgroundImage = `url(${loginBg})`
      console.log("COINS");
    }
  }, [isRegistering]);

  useEffect(() => {
    if (userPassword.length < 8) {
      setValidatePassword("validate__bad");
    } else if (userPassword.length > 8 && hasSpecialSymbol === true) {
      setValidatePassword("validate__good");
    } else if (userPassword.length === 1) {
      setValidatePassword("validate__none");
      console.log("NONE!!!");
      
    } else {
      setValidatePassword("validate__medium");
    }
    console.log(userPassword.length);

    console.log(validatePassword);
    console.log(userPassword);
    console.log("#?", hasSpecialSymbol);
  }, [userPassword]);
  // -----транзакція(макс)-----
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            date: "04.01.19",
            type: "-",
            category: "Other",
            comment: "Gift for your wife",
            sum: 300,
          },
          {
            id: 2,
            date: "05.01.19",
            type: "+",
            category: "Income",
            comment: "January bonus",
            sum: 8000,
          },
          {
            id: 3,
            date: "07.01.19",
            type: "-",
            category: "Car",
            comment: "Oil",
            sum: 1000,
          },
          {
            id: 4,
            date: "07.01.19",
            type: "-",
            category: "Products",
            comment: "Vegetables for the week",
            sum: 280,
          },
          {
            id: 5,
            date: "07.01.19",
            type: "+",
            category: "Income",
            comment: "Gift",
            sum: 1000,
          },
        ];
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userEmail === registeredUser.email &&
      userPassword === registeredUser.password
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect user email or password");
      console.log(`Typed email: ${userEmail}`);
      console.log(`Typed password: ${userPassword}`);
      console.log(`Needed email: ${registeredUser.email}`);
      console.log(`Needed password: ${registeredUser.password}`);

      return;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (userPassword !== userPasswordCkeck || userPassword.length < 8) {
      alert("Password is too weak or doesn't match");
      return;
    }

    const registered = {
      name: username,
      password: userPassword,
      email: userEmail,
    };
    setRegisteredUser(registered);
    setIsRegistering(false);
    console.log(registeredUser);

    localStorage.setItem("user", JSON.stringify(registered));
  };

  if (isLoggingOut) {
    return (
      <>
        <Header name={registeredUser.name} loggingout={setIsLoggingOut} />
        <Logout loggingout={setIsLoggingOut} setIsLoggedIn={setIsLoggedIn} />
      </>
    );
  }

  if (isRegistering) {
    return (
      <Register
        setIsRegistering={setIsRegistering}
        handleRegister={handleRegister}
        setUsername={setUsername}
        setUserPassword={setUserPassword}
        setUserEmail={setUserEmail}
        setUserPasswordCkeck={setUserPasswordCkeck}
        validatePassword={validatePassword}
      />
    );
  }

  if (isLoggedIn) {
    return (
      <>
        <Header name={registeredUser.name} loggingout={setIsLoggingOut} />
        <Home transactions={transactions} setTransactions={setTransactions} />
      </>
    );
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
  );
}

export default App;
