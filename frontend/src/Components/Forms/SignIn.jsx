import Input from "../Input";
import Button from "../Button";

const SignIn = () => {
  return (
    <div className="flex bg-sky-100">
      <div className="w-1/2 h-screen">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Background view"
          className="object-cover h-screen"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-screen gap-4">
        <form className="flex flex-col justify-center w-3/5 gap-4">
          <h1 className="text-3xl font-medium">Login</h1>
          <Input type="text" name="Username" label="Username" />
          <Input type="password" name="password" label="Password" />
          <Button
            className="mt-3"
            title="Log in"
            variant="red"
            onClick={() => console.log("submitted")}
          />
          {/* This needs to change to be a link */}
          <h2 className="text-green-500">Sign up here</h2>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
