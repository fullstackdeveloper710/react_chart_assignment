import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import DynamicChart from "./dynamicGraphChart";
import Staticchart from "./staticchart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<DynamicChart />} />
        <Route path="/frontendManageChart" element={<Staticchart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
