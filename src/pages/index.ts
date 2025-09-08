import { lazy } from "react"

const Login = lazy(() => import("./auth/Login")) 
import LoginHome from "./auth/LoginHome"
import DashboardHome from "./dashboard/DashboardHome"
import Teachers from "./dashboard/Teachers"
import Students from "./dashboard/Students"

import Groups from "./dashboard/groups/Groups"
import GroupCreate from "./dashboard/groups/GroupCreate"

import Stacks from "./dashboard/stacks/Stacks"
import StacksCreate from "./dashboard/stacks/StacksCreate"
import StackMore from "./dashboard/stacks/StackMore"

export {LoginHome, Login, DashboardHome, Groups, Stacks, Teachers, Students, StacksCreate, StackMore, GroupCreate}