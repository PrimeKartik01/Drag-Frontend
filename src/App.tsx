import Home from "@/pages/home/home.tsx";
import { ProjectDetails } from "@/features/projects/components/project-details";
import { Route, Routes } from "react-router-dom";
import Projects from "./pages/projects/projects";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
}

export default App;
