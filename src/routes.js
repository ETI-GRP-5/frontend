import React from "react";

// Admin Imports
import Profile from "views/admin/profile";
import CommunityProjects from "views/admin/projects";
import CommunityOrganisations from "views/admin/organisation"
import CommunityForum from "views/admin/forum";
import SearchView from "views/admin/search"; //New search in side bar
import FileUploadView from "views/admin/resource"
import ProjectDetails from "../src/views/admin/projects/[id]/index.jsx";
import DiscussionDetails from "../src/views/admin/forum/[id]/index.jsx";
import TaskView from "views/admin/task"; //Zach is testing task

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdForum,
} from "react-icons/md";
import { FaSearch } from 'react-icons/fa';
import { ImDropbox } from "react-icons/im";
import { VscOrganization } from "react-icons/vsc";
import { IoPersonSharp } from "react-icons/io5";


const routes = [
  // {
  //   name: "Main Dashboard (X touch)",
  //   layout: "/admin",
  //   path: "default",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <MainDashboard />,
  // },
  {
    name: "Community Projects",
    layout: "/admin",
    path: "default",
    icon: <ImDropbox className="h-6 w-6" />,
    component: <CommunityProjects />,
  },
  {
    name: " ",
    layout: "/admin",
    path: "projects/:id",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <ProjectDetails />,
    css: "hidden",
  },
  {
    name: "Profile Settings",
    layout: "/admin",
    path: "profile",
    icon: <IoPersonSharp className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Community Organizations",
    layout: "/admin",
    path: "organ",
    icon: <VscOrganization className="h-6 w-6" />,
    component: <CommunityOrganisations />,
    secondary: true,
  },
  {
    name: "Community Forum",
    layout: "/admin",
    path: "forum",
    icon: <MdForum className="h-6 w-6" />,
    component: <CommunityForum />,
  },
  {
    name: " ",
    layout: "/admin",
    path: "forum/:id",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <DiscussionDetails />,
    css: "hidden",
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
  {//For testing of creating and deleting tasks
    name: "Task",
    layout: "/admin",
    path: "task", // Adjust the path to include the search query as a parameter
    icon: <MdHome className="h-6 w-6" />,
    component: <TaskView />,
  },
];
export default routes;
