import { Loader as LoaderSVG } from "@/assets";

function Loader() {
  return (
    <div className="w-full flex justify-center items-center">
      <img
        src={LoaderSVG}
        alt="loader"
        width={24}
        height={24}
        className="animate-spin"
      />
    </div>
  );
}

export default Loader;
