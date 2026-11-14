
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy loaded pages
const Home = lazy(() => import("@/pages/home/home"));
const Projects = lazy(() => import("./pages/projects/projects"));

// Lazy loaded component
const ProjectDetails = lazy(() =>
  import("@/features/projects/components/project-details").then((module) => ({
    default: module.ProjectDetails,
  }))
);

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="size-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#065b47]" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Suspense>
  );
}

export default App;
