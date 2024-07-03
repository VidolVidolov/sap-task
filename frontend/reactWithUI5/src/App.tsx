import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Authors } from "./pages/Authors/Authors";
import { BookDetails } from "./pages/BookDetails/BookDetails";
import { Home } from "./pages/Home/Home";
import { Navigation } from "./components/Navigation/Navigation";
import { ThemeProvider } from "@ui5/webcomponents-react";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigation />}>
            <Route path="/" element={<Home />} />
            <Route path="details" element={<BookDetails />} />
            <Route path="authors" element={<Authors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
