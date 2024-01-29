import NavList from "../components/NavList";
import "../App.css";
import home from "../assets/home.jpg";
export const HomePage = () => {
  return (
    <div className="overflow-y-hidden">
      <NavList />
      <div className="w-full h-full">
        <img
          src={home}
          alt="pict"
          width={"100%"}
          // style={{ height: 900, width: 10000 }}
        />
      </div>
    </div>
  );
};
