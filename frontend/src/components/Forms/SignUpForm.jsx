import { Link } from "react-router-dom";

import Input from "../Input";
import Button from "../Button";

const SignUpForm = () => {
  return (
    <form className="flex flex-col justify-center w-3/5 gap-4">
      <h1 className="text-3xl font-medium">Sign Up</h1>
      <Input type="text" name="Username" label="Username" />
      <Input type="password" name="password" label="Password" />
      <Button
        className="mt-3"
        title="SIgn up"
        variant="red"
        onClick={() => console.log("submitted")}
      />
      <Link className="text-green-500" to={"/signin"}>
        Already have an account
      </Link>
    </form>
  );
};

export default SignUpForm;
