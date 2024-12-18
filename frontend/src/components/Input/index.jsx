import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-slate-800" htmlFor={props?.name}>
        {props?.label}
      </label>
      <input
        ref={ref}
        className="p-2 border rounded-md border-slate-300"
        type={props?.type}
        id={props?.name}
        name={props?.name}
        {...props}
      />
      <p className="text-red-500">{props?.error}</p>
    </div>
  );
});

export default Input;
