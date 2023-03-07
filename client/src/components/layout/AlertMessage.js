import React from "react";
import "./AlertMessage.css";

const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <div className={`alert ${info.type}-alert`}>
      <h3 className="no-margin">{info.message}</h3>
    </div>
  );
};

export default AlertMessage;
