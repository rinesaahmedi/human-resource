import React, { forwardRef } from "react";

const CustomSelect = forwardRef(
  ({ label, name, options, value, onChange, error, placeholder }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-slate-800">{label}</label>
        <select
          ref={ref}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 bg-white border rounded-md border-slate-300 text-slate-800"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
);

export default CustomSelect;
