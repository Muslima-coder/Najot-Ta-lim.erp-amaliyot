import { lazy } from "react";
const Login = lazy(() => import("./Auth/Login"))

import LoginHome from "./Auth/LoginHome";
import DashboardHome from "./dashboard/DashboardHome";
import Stacks from "./dashboard/Stacks";
import Groups from "./dashboard/Groups";
import Teachers from "./dashboard/Teachers";
import Students from "./dashboard/Students";


export {Login, LoginHome, DashboardHome, Groups, Stacks, Teachers, Students}