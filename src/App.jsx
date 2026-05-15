import React from "react";
import Router from "./router/Router";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  AOS.init();
  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
