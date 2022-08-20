import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import MainLayout from "./layouts/main";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" exact component={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
