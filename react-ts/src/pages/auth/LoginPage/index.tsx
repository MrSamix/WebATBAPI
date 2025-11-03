import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import type { IAuthLogin } from "../../../types/auth/IAuthLogin";
import { useLoginMutation } from "../../../services/apiAuth";
import { AuthContext, type AuthContextType } from "../../../context/AuthContext";

function LoginPage() {

  const [login, { isLoading }] = useLoginMutation();

  const { login: contextLogin } = useContext(AuthContext) as AuthContextType;

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);


  const [form, setForm] = useState<IAuthLogin>({
    email: "",
    password: "",
  });


  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    try {
      const result = await login(form).unwrap(); // unwrap викидає виключення при помилці (status >= 400 або мережевій)
      if (result.token) {
        contextLogin(result.token);
        navigate("/");
      }
    } catch (err: any) {
      setError(Object.values(err.data?.errors).join("\n") || "Помилка входу");
      console.error("Login error:", err);
    }
  }

  return (
    <div>
      <h1 className={"text-4xl font-extrabold text-center mb-8 my-4 dark:text-white"}>Вхід</h1>
      {error && (
        <div className="text-red-500 text-center my-4">
          {error.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Електронна пошта</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer dark:border-gray-600" placeholder=" " required onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Пароль</label>
        </div>
        <button type="submit" disabled={isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {isLoading ? "Опрацювання..." : "Увійти"}
        </button>
      </form>
    </div>
  )
}

export default LoginPage;