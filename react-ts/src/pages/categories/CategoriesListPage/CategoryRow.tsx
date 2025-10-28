import DeleteConfirmDialog from "../../../components/DeleteConfirmDialog";
import EditConfirmDialog from "../../../components/EditConfirmDialog";
import APP_ENV from "../../../env";
import { useDeleteCategoryMutation } from "../../../services/apiCategory";
import type { ICategoryItem } from "../../../types/category/ICategoryItem";

interface Props {
    category: ICategoryItem;
}

const CategoryRow : React.FC<Props> = ({ category }) => {
    const [deleteCategory] = useDeleteCategoryMutation();
    let imageUrl : string = "";
    if (category.image.startsWith("https://") || category.image.startsWith("http://")) {
        imageUrl = category.image;
    } else {
        imageUrl = `${APP_ENV.API_SMALL_IMAGE_URL}${category.image}`;
    }


    const handleDelete = async () => {
        try {
            await deleteCategory(category.id);
        }
        catch (e)
        {
            console.error("Error", e);
            alert("Problem with delete");
        }
    }
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td className="px-6 py-4">
                <img src={imageUrl} alt={category.name} width={75}/>
            </td>
            <td scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {category.name}
            </td>
            <td className="flex py-5 gap-1">
                <EditConfirmDialog category={category} />
                <DeleteConfirmDialog deleteAction={handleDelete} title={`Ви дійсно бажаєте видалити ${category.name}?`} />
            </td>
        </tr>
    )
}

export default CategoryRow;