import { Route, Routes } from "react-router";
import Home from "./Home";
import CreateCategory from "./CreateCategory/CreateCategory";

const RoutesConfig: React.FC = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/create" element={<CreateCategory />} />
      </Routes>
    );
}

export default RoutesConfig;