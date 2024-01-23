import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import CommunityProjects from "views/admin/projects";
import CommunityForum from "views/admin/forum";
import SearchView from "views/admin/search"; //New search in side bar
import FileUploadView from "views/admin/resource" //For testing purpose, should not be included with the navbar

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import { FaSearch } from 'react-icons/fa';


const routes = [
  {
    name: "Main Dashboard (X touch)",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "NFT Marketplace (X touch)",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables (X touch)",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile (X touch)",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In (X touch)",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "RTL Admin (X touch)",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },
  {
    name: "Profile Settings",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Community Organizations",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Community Projects",
    layout: "/admin",
    path: "projects",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <CommunityProjects />,
  },
  {
    name: "Community Forum",
    layout: "/admin",
    path: "forum",
    icon: <MdHome className="h-6 w-6" />,
    component: <CommunityForum />,
  },
  {
    name: "Notifications",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Search",
    layout: "/admin",
    path: "search/:query", // Adjust the path to include the search query as a parameter
    icon: <FaSearch className="h-6 w-6" />,
    component: <SearchView />,
  },
  {//For testing of resource upload (Simon)
    name: "Resource",
    layout: "/admin",
    path: "resource", // Adjust the path to include the search query as a parameter
    icon: <MdHome className="h-6 w-6" />,
    component: <FileUploadView />,
  },
];
export default routes;
