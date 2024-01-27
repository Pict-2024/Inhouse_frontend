import NavList from "../components/NavList";
import "../App.css"
// import { Carousel } from "@material-tailwind/react";
export const HomePage = () => {
  return (
    <div className="overflow-y-hidden">
      <NavList/>
      <div className="w-full h-full">
        <img src="../../src/assets/loginbg.jpg" alt="" />
      </div>
    </div>
  );
};
