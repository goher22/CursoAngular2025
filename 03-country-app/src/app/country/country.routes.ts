import { ByCapitalPageComponent } from "./pages/by-capital-page/by-capital-page.component";

export const countryRoutes = [
    {
        path: '',
        Component: ByCapitalPageComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
]

export default countryRoutes;