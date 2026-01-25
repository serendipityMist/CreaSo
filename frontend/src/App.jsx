
import ScrollIndicator from "./components/ScrollIndicator";
import Home from "./Pages/Home";

const sections = [
  "First Hero Section",
  "Second Hero Section",
  "Third Hero Section",
  "Fourth Hero Section",
  "Fifth Hero Section",
  "Sixth Hero Section",
  "Seventh Hero Section",
  "Eighth      Hero Section",
];

const App = () => {
  return (
    <div className="relative bg-[#0f0f1a] text-white">
      <Home/>
      <ScrollIndicator />
      

    </div>
  );
};

export default App;
