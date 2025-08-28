import { lazy } from "react";

import LoginHome from "./Auth/LoginHome";
import DashboardHome from "./dashboard/DashboardHome";
import Groups from "./dashboard/Groups";

const Login = lazy(() => import("./Auth/Login"))

export {Login, LoginHome, DashboardHome, Groups}