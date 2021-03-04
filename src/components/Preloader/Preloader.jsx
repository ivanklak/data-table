import React from "react";
import preloader from "../../assets/loader2.gif";

let Preloader = props => {
  return (
    <div style={{ backgroundColor: "" }}>
      <img src={preloader} />
    </div>
  );
};

export default Preloader;
