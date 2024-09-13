import React from 'react';
import * as C from './styles';

const Select = ({ options, value, name, onChange, style }) => {
  return (
    <C.Select name={name} value={value} onChange={onChange} style={style}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </C.Select>
  );
};

export default Select;
