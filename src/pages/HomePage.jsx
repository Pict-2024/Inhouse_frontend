import NavList from "../components/NavList";
import "../App.css";
import home from "../assets/home.jpg";
export const HomePage = () => {
  
  return (
    <div className="overflow-y-hidden">
      <NavList />
      <div className=" flex w-full h-full items-center justify-center">
        <img
          src={home}
          alt="pict"
          className="lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm  h-screen object-cover"
        />
      </div>
    </div>
  );
};
