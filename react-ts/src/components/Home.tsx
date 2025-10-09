import { useEffect, useState } from "react";
import CategoryList, { type Category } from "./CategoryList/CategoryList";
import ButtonCreateCategory from "./ButtonCreateCategory/ButtonCreateCategory";
import { API_URL, CATEGORIES_ENDPOINT } from "../constants/Link";

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories(url: string) {
      const response = await fetch(url);
      const data = await response.json();
      setCategories(data);
    }
    fetchCategories(API_URL + CATEGORIES_ENDPOINT);
  }, []);

  return (
    <>
      <CategoryList categories={categories} />
      <ButtonCreateCategory />
    </>
  );
};

export default Home;
