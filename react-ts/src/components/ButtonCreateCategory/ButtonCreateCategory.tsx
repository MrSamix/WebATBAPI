import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const ButtonCreateCategory: React.FC = () => {
    const navigate = useNavigate();

    return (
        <FloatButton icon={<PlusOutlined />} type='primary' shape="square" style={{ width: 170 }} description="Create Category" onClick={() => navigate('/category/create')} />
    )
}

export default ButtonCreateCategory;