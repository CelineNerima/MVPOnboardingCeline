import { Customer } from "./components/Customer";
import { Home } from "./components/Home";
import { Product } from "./components/Product";
import { Sale } from "./components/Sale";
import { Store } from "./components/Store";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },    
    {
        path: '/customer',
        element: <Customer />
    },
    {
        path: '/store',
        element: <Store />
    },
    {
        path: '/product',
        element: <Product />
    },
    {
        path: '/sale',
        element: <Sale />
    }

];

export default AppRoutes;
