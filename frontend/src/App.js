import React, { useEffect, useState } from "react";
import SignIn from "./Components/Forms/SignIn";
import SignUp from "./Components/Forms/SignUp";

function App() {
  return (
    <div>
      <SignUp></SignUp>
      <SignIn></SignIn>
    </div>
  );
}

export default App;
