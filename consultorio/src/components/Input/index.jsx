import React from "react";
import MaskedInput from "react-text-mask";
import * as C from "./styles";

const Input = ({ mask, type, placeholder, value, name, onChange, style, onFocus, onBlur }) => {

  return  (
    <C.Input
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type}
      name={name}
      style={style}
      placeholder={placeholder}
    />
  );
};

export default Input;
