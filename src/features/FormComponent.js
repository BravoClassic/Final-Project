import React, { useRef, useState } from "react";
import "../assets/css/form.css";
import { useAuth } from "../utils/AuthContext";
const FormComponent = ({ isCreateAccount }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, registerUser } = useAuth();
  const formDetails = useRef(null);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Perform form submission logic here
    if (isCreateAccount) {
      registerUser(e);
    } else {
      loginUser(e);
    }

    // Reset form fields
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form className="h-full flex flex-wrap justify-center items-center flex-col" onSubmit={handleFormSubmit} ref={formDetails}>
     {isCreateAccount && (
        <div className="flex flex-wrap flex-col my-2">
          <label className="text-left" htmlFor="username">
            Username
          </label>
          <input
            className="form__input"
            type="text"
            id="username"
            // placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      )}
      <div className="flex flex-wrap flex-col my-2">
        <label className="text-left" htmlFor="email">
          Email
        </label>
        <input
          className="form__input"
          type="email"
          id="email"
          // placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-wrap flex-col my-2">
        <label className="text-left" htmlFor="password">
          Password
        </label>
        <input
          className="form__input"
          type="password"
          // placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-wrap flex-col my-3">
        <button className="form__button" type="submit">
          {isCreateAccount ? "Create Account" : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
