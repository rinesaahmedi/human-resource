const Input = ({type, label, name, error, register}) => {
    return (
        <div className="flex flex-col gap-1">
            <input
                className={`p-2 border-b-2 outline-none placeholder:text-[#C4C4C4] text-[#5c5c5c] font-light ${
                    error ? 'border-[#E94F53]' : 'border-slate-300'
                }`}
                type={type}
                id={name}
                name={name}
                placeholder={label}
                {...register(name)}
            />
            {error && <p className="text-[#E94F53]">{error}</p>}
        </div>

    );
};

export default Input;
