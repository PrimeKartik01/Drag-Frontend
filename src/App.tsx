import Home from "@/pages/home/home.tsx";
import { ProjectDetails } from "@/features/projects/components/project-details";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} />
    </Routes>
  );
}

export default App;
