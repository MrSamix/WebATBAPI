import APP_ENV from "../../../env";
import type { ICategoryItem } from "../../../types/category/ICategoryItem";

interface Props {
    category: ICategoryItem;
}

const CategoryRow : React.FC<Props> = ({ category }) => {
    let imageUrl : string = "";
    if (category.image.startsWith("https://")) {
        imageUrl = category.image;
    } else {
        imageUrl = `${APP_ENV.API_URL}/images/512_${category.image}`;
    }
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img src={imageUrl} alt={category.name} width={75}></img>
            </th>
            <td className="px-6 py-4">
                {category.name}
            </td>
        </tr>
    )
}

export default CategoryRow;