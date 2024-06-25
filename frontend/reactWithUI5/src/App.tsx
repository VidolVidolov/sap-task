import {
  SideNavigation,
  SideNavigationItem,
  ThemeProvider,
} from "@ui5/webcomponents-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { AboutMe } from "./pages/AboutMe/AboutMe";
import "@ui5/webcomponents-icons/dist/AllIcons.js";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about-me",
    element: <AboutMe />,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <SideNavigation className="side-navigation">
        <SideNavigationItem icon="home" text="Home" href="/" />
        <SideNavigationItem icon="account" text="About me" href="/about-me" />
      </SideNavigation>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
