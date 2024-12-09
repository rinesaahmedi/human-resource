import Input from "../Input";
import Button from "../Buttons/Button";

const SignUp = () => {
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
          <h1 className="text-3xl font-medium">Sign Up</h1>
          <Input type="text" name="Username" label="Username"></Input>
          <Input type="password" name="password" label="Password"></Input>
          <Button
            className="mt-3"
            title="SIgn up"
            variant="red"
            onClick={() => console.log("submitted")}
          />
          {/* This needs to change to be a link */}
          <h2 className="text-green-500">Already have an account</h2>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
