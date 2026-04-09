import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackgroundEffects from "./components/BackgroundEffects";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <BackgroundEffects />
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<CatalogPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
