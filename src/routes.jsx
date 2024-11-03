import { createRootRoute, createRoute } from "@tanstack/react-router";
import Root from "./components/Root";
import CafesPage from './pages/CafesPage'
import EmployeesPage from './pages/EmployeesPage'
import CafeForm from './components/CafeForm'
import { fetchAllEmployees, fetchEmployeesByCafe } from "./api";

const rootRoute = createRootRoute({
    component: Root
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: CafesPage
});

const addNewCafeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/add-cafe",
    component: CafeForm
});

const editCafeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/edit-cafe/:cafeId",
    component: CafeForm,
    loader: async ({ params }) => {
        const { cafeId } = params; 
        return fetchCafe(cafeId); 
    },
});

const employeeList = createRoute({
    getParentRoute: () => rootRoute,
    path: "/employees",
    component: EmployeesPage,
    loader: async () => {
        return fetchAllEmployees(); 
    },
});

const employeeListByCafeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "$id", 
    component: EmployeesPage,
    loader: async ({ params }) => {
        const { id } = params; 
        return fetchEmployeesByCafe(id); 
    },
});

export const routeTree = rootRoute.addChildren([indexRoute, addNewCafeRoute,editCafeRoute, employeeList, employeeListByCafeRoute])
