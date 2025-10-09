import React from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';

export type Category = {
    id: number;
    name: string;
    image: string;
};

type CategoryListProps = {
    categories: Category[];
};

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    return (
        <div className='grid grid-cols-3 gap-4'>
            {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
    );
};

export default CategoryList;