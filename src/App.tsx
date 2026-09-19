import Projects from "./pages/projects/projects.tsx";
import { ProjectDetails } from "@/features/projects/components/project-details";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} />
    </Routes>
  );
}

export default App;
