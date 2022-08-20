import Home from "./views/home";
import MainLayout from "./layouts/main";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <MainLayout>
      <Routes>
       <Route path="/" exact element={<Home/>} />
      </Routes>
     </MainLayout>
  );
}

export default App;