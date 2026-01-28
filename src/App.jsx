import { BrowserRouter, Routes, Route } from "react-router-dom";
import LevavimMoshavSite from "./LevavimMoshavSite";
import ArchivePage from "./ArchivePage";

export default function App() {
  // Use /livnim for production (GitHub Pages), / for local development
  // Note: basename should NOT have trailing slash, but vite base should
  const basename = import.meta.env.PROD ? "/livnim" : "";
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<LevavimMoshavSite />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </BrowserRouter>
  );
}
