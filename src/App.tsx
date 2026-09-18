import Projects from "./pages/Projects/Projects.tsx";
import { ProjectDetails } from "@/features/projects/components/ProjectDetails";
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
