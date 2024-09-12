import React from "react";
import * as C from "./styles";

const Button = ({ Text, onClick, Type = "button", style }) => {
  return (
    <C.Button type={Type} onClick={onClick} style={style}>
      {Text}
    </C.Button>
  );
};

export default Button;