/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-lightPrimary pb-10 shadow-2xl shadow-white/5 border-r border-black transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[35px] mt-[35px] flex flex-col items-center`}>
        <img src={require("./../../assets/img/sdg-banner/E_SDG_logo_UN_emblem_horizontal_trans_WEB.png")} alt="sdg logo" className="w-[200px] h-auto mb-2"/>
        <div className="h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          SDG <span class="font-medium">Collab</span>
        </div>
      </div>
      <div class="mt-[55px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Free Horizon Card */}
      {/* <div className="flex justify-center">
        <SidebarCard />
      </div> */}

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
