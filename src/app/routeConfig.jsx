import NotFoundPage from "../pages/NotFoundPage";
import PortfolioPage from "../pages/PortfolioPage";

export const routeConfig = [
  {
    path: "/",
    element: <PortfolioPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];