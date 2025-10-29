import { useState, type FormEvent } from "react";
import { useRegisterMutation } from "../../../services/apiAuth";
import type { IAuthRegister } from "../../../types/auth/IAuthRegister";
import FileDropzone from "../../../components/inputs/FileDropzone";
import classNames from "classnames";
import { useNavigate } from "react-router";

interface FormProps {
    email: string;
    password: string;
    confirmPassword: string;
    image: null | File;
}


function RegisterPage() {
    // Корректная деструктуризация: второй элемент — объект состояния мутации, а не сама ошибка
    const [ register, { isLoading } ] = useRegisterMutation();
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<FormProps>({
        email: "",
        password: "",
        confirmPassword: "",
        image: null,
    });

    const setPreviewImage = (file: File | null) => {
        const preview = document.getElementById(`preview-register`) as HTMLImageElement | null;
        if (!preview) return;
        if (file) {
            preview.src = URL.createObjectURL(file);
        } else {
            preview.src = "https://flowbite.com/docs/images/examples/image-3@2x.jpg";
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Паролі не співпадають");
            return;
        }
        else if (form.password.length < 6) {
            setError("Пароль має містити щонайменше 6 символів");
            return;
        }
        setError(null);
        const formdata : IAuthRegister = {
            email: form.email,
            password: form.password,
            image: form.image,
        }
        try {
            await register(formdata).unwrap(); // unwrap викидає виключення при помилці (status >= 400 або мережевій)
            navigate("/");
        } catch (err: any) {
            setError(err.data);
            console.error("Registration error:", err);
        }
    }

    return (
        <div>
            <h1 className={"text-4xl font-extrabold text-center mb-8 my-4 dark:text-white"}>Реєстрація</h1>
            {error && <p className="text-red-500 text-center my-4">{error}</p>}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Електронна пошта</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" className={classNames(`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`, { "border-red-500": form.password && form.password.length < 6 }, {"dark:border-gray-600": !form.password || form.password.length >= 6})} placeholder=" " required onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Пароль</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" id="floating_repeat_password" className={classNames("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer", { "border-red-500": form.password && form.password.length < 6 || form.confirmPassword !== form.password && form.confirmPassword }, {"dark:border-gray-600": !form.confirmPassword || form.confirmPassword.length >= 6 && form.confirmPassword === form.password })} placeholder=" " required onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Підтвердити пароль</label>
                </div>
                <figure className="col-span-2 mb-3">
                    <img id={`preview-register`} className="h-auto max-w-full rounded-lg" src="https://flowbite.com/docs/images/examples/image-3@2x.jpg" alt="image description" />
                </figure>
                <FileDropzone id={`dropzone-file-register`}
                    file={form.image}
                    onFileChange={(file) => {
                        setForm({ ...form, image: file })
                        setPreviewImage(file);
                    }}
                    accept="image/*"
                    heightClassName="h-40" />
                <button type="submit" disabled={isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isLoading ? "Опрацювання..." : "Зареєструватися"}
                </button>
            </form>
        </div>
    )
}

export default RegisterPage;