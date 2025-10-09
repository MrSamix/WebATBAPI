import { API_URL, IMAGES_FOLDER } from "../../constants/Link";
import type { Category } from "../CategoryList/CategoryList"
import { Card } from 'antd';

const { Meta } = Card;

const getImageSrc = (image: string) => {
    return image.startsWith('http') ? image : API_URL + IMAGES_FOLDER + '/1024_' + image;
}


const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
    return (
      <Card
        cover={
          <img draggable={false} style={{ objectFit: "cover", height: 300 }} alt={category.name} src={getImageSrc(category.image)} />
        }
      >
        <Meta title={category.name} />
      </Card>
    );
}

export default CategoryCard;