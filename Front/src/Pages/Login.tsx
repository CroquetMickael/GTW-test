import { useAuth } from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    password: yup.string().required("Le mot de passe est obligatoire"),
    email: yup.string().required("L'email est obligatoire").email("Le format d'email est invalide"),
  })
  .required();

const Login = () => {
  const { onLogin } = useAuth();
  const { register, getValues, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        onLogin({
          email: getValues("email"),
          password: getValues("password"),
        });
      }}
    >
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="username"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="email"
          {...register("email")}
          placeholder="Email"
        />
        <p className="text-red-500">{formState.errors["email"]?.message}</p>
      </div>
      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          {...register("password")}
          type="password"
          placeholder="******************"
        />
        <p className="text-red-500">{formState.errors["password"]?.message}</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Sign In
        </button>
        <Link
          className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-800 hover:underline"
          to={"/register"}
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export { Login };
