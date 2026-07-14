import { BrowserRouter, Route, Routes } from "react-router";

import AppShell from "./AppShell";
import { routeConfig } from "./routeConfig";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          {routeConfig.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;