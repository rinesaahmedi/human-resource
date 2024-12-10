const Input = ({ type, label, name, error, register }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-slate-800" htmlFor={label}>
        {label}
      </label>
      <input
        className="p-2 border rounded-md border-slate-300"
        type={type}
        id={name}
        name={name}
        {...register(name)}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
};

export default Input;
