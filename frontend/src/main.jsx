import { StrictMode } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import Blog from "./Pages/Blog.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound.jsx";
import PortfolioDetail from "./Pages/PortfolioDetail.jsx";
import Store from "./Pages/Store.jsx";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="store" element={<Store />} />
      <Route path="blog" element={<Blog />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="portfolio/:id" element={<PortfolioDetail />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
