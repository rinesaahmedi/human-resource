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
      case "blue":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case "yellow":
        return "bg-yellow-500 hover:bg-yellow-600 text-black";
      case "purple":
        return "bg-purple-500 hover:bg-purple-600 text-white";
      case "green":
        return "bg-green-500 hover:bg-green-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  return (
    <button
      disabled={disabled}
      className={`min-w-md w-fit rounded-md px-9 py-2 gap-2.5 flex justify-center items-center cursor-pointer
         ${getButtonVariant(variant)} ${className}`}
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
