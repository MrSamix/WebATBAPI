import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import type { IAuthLogin } from "../../../types/auth/IAuthLogin";
import { useLoginByGoogleMutation, useLoginMutation } from "../../../services/apiAuth";
import { AuthContext, type AuthContextType } from "../../../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

function LoginPage() {

  const [login, { isLoading }] = useLoginMutation();
  const [loginByGoogle, { isLoading: isLoadingGoogle }] = useLoginByGoogleMutation();

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


  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("tokenResponse", tokenResponse.access_token);
      try {
        const result = await loginByGoogle(tokenResponse.access_token).unwrap();
        if (result.token) {
          contextLogin(result.token);
          navigate('/');
        }
      } catch (error) {
        console.error("Google login error:", error);
      }
    },
  });

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
        <div className="flex gap-3 items-center">
          <button type="submit" disabled={isLoading || isLoadingGoogle} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {isLoading || isLoadingGoogle ? "Опрацювання..." : "Увійти"}
        </button>
        <button type="button" onClick={() => googleLogin()} className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55">
          <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
          </svg>
          Sign in with Google
        </button>
        </div>
        
      </form>
    </div>
  )
}

export default LoginPage;