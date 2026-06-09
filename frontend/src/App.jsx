
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollIndicator from "./components/ScrollIndicator";



const App = () => {
  return (
   <>
    <Navbar/>
    <ScrollIndicator/>
    <Outlet/>
    <Footer/>
   </>
  );
};

export default App;
