import { Routes } from "@angular/router";
import { AdminDashboardLayout } from "./layout/admin-dashboard-layout/admin-dashboard-layout";
import { ProductsAdminPage } from "./pages/products-admin-page/products-admin-page";
import { ProductAdminPage } from "./pages/product-admin-page/product-admin-page";
import { isAdminGuard } from "@/auth/guards/is-admin-guard";

export const adminDashboardRoutes: Routes = [
    {
        path: '',
        component: AdminDashboardLayout,
        canMatch: [
            isAdminGuard
        ],
        children: [
            {
                path:'products',
                component: ProductsAdminPage
            },
            {
                path:'product/:id',
                component: ProductAdminPage
            },
            {
                path:"**",
                redirectTo: 'products'
            }
        ]
    }
]

export default adminDashboardRoutes;