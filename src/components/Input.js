import React from "react";

const Input = (props) => {
  const { id, name, label, type, error, onChange } = props;
  const className = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-floating mb-3">
      <input
        id={id}
        name={name}
        className={className}
        type={type}
        placeholder="example"
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
