import React from "react";
import MaskedInput from "react-text-mask";
import * as C from "./styles";

const Input = ({ mask, type, placeholder, value, onChange }) => {

  const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  // Use a máscara se o tipo for "cpf"
  const selectedMask = type === "cpf" ? cpfMask : mask;

  return selectedMask ? (
    <MaskedInput
      mask={selectedMask}
      value={value}
      onChange={onChange}
      render={(ref, props) => (
        <C.Input ref={ref} {...props} type={type === "cpf" ? "text" : type} placeholder={placeholder} />
      )}
    />
  ) : (
    <C.Input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
