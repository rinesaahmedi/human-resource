import { SignInForm } from "../../components/Forms";

const SignIn = () => {
  return (
    <div className="flex bg-sky-100">
      <div className="w-1/2 h-screen">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Background view"
          className="object-cover object-left-top w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-screen gap-4">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
