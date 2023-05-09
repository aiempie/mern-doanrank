import React from "react";
import "./AlertMessage.css";

const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <div className={`alert ${info.type}-alert`} style={{ borderRadius: "5px" }}>
      <h5 className="no-margin" style={{ color: "white" }}>
        {info.message}
      </h5>
    </div>
  );
};

export default AlertMessage;
