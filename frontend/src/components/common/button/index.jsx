const Button = ({
                    title,
                    variant = "blue",
                    disabled,
                    type = "button",
                    onClick,
                    className,
                }) => {
    const getButtonVariant = (variant) => {
        switch (variant) {
            case "red":
                return "bg-red-500 hover:bg-red-600  text-white ";
            case "green":
                return "bg-green-500 hover:bg-green-600 text-white";
            case "gray":
                return "bg-[#599698] hover:bg-[#548e8f] text-white";
            case "blue":
                return " border-2 border-[#1F263E] hover:bg-[#1F263E] hover:text-white text-[#1F263E]";
            case "outlined":
                return " border-2 border-[#599698] hover:bg-[#599698] hover:text-white text-[#599698]";
            default:
                return "bg-gray-500 hover:bg-gray-600 text-white";
        }
    };

    return (
        <button
            disabled={disabled}
            className={`rounded-md px-9 py-2 gap-2.5 flex justify-center items-center cursor-pointer
         ${getButtonVariant(variant)} ${className}`}
            onClick={onClick}
            type={type}
        >
            {title}
        </button>
    );
};

export default Button;
