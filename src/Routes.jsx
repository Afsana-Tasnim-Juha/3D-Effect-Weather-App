import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "./Layout/Main";
//import WeatherComponent from "./WeatherComponent";
import App from "./App";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [

            {
                path: "/",
                element: <App />,
            },


        ],
    },
]);




