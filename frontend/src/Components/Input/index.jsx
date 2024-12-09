const Input = ({ type, label, name }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-slate-800" for={label}>
        {label}
      </label>
      <input
        className="p-2 border rounded-md border-slate-300"
        type={type}
        id={name}
        name={name}
      />
    </div>
  );
};

export default Input;
