import React from "react";
import { useAuth } from "../utils/AuthContext";
import Events from "./Events";
function Home() {
  const { user } = useAuth();
  return <Events user={user} />;
}

export default Home;
