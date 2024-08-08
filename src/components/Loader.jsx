import { skeleton } from "@/assets";

const Loader = () => {
  return (
    <div>
      <img
        src={skeleton}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full md:w-3/4"
        alt="skeleton"
      />
    </div>
  );
};

export default Loader;
