import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../../api";
import TextInput from "../../../components/inputs/TextInput";
import FileDropzone from "../../../components/inputs/FileDropzone";

interface Props{
    name: string;
    image: null | File;
}

const CategoryCreatePage = () => {
    const navigator = useNavigate();

    const [form, setForm] = useState<Props>({
        name: "",
        image: null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Send data:", form);
        try {
            const data = new FormData();
            data.append("name", form.name);
            if (form.image) {
                data.append("image", form.image);
            }
            await api.post("Categories", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigator("/");
        } catch (error) {
            console.error("Problem working handleSubmit", error);
            alert("Problem working handleSubmit");
        }
    }

    

    return (
        <>
            <h1 className={"text-4xl font-extrabold text-center mb-8"}>Створення категорії</h1>

            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    required
                    label="Назва"
                />

                {/* <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="image" id="image" onChange={handleChange}
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required/>
                    <label htmlFor="image"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Фото
                    </label>
                </div> */}

                <FileDropzone
                    id="dropzone-file"
                    file={form.image}
                    onFileChange={(file) => setForm({ ...form, image: file })}
                    accept="image/*"
                    heightClassName="h-40"
                />

                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Додати
                </button>
            </form>
        </>
    )
}

export default CategoryCreatePage;