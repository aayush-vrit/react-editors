import { Route, Routes } from "react-router";
import Suneditor from "./pages/Suneditor";
import Home from "./pages/Home";
import "./index.css";

import Layout from "./pages/Layout";
import Lake from "./pages/Lake";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/suneditor" element={<Suneditor />}></Route>
          <Route path="/lake" element={<Lake />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
