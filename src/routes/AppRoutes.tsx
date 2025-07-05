import React from "react";
import { Routes, Route } from "react-router-dom";
import WebsiteAnalysisPage from "../modules/website-analysis/pages/WebsiteAnalysisPage";
import DynamicApiTestPage from "../modules/dynamic-api-test/pages/DynamicApiTestPage";
import DummyApiTestPage from "../modules/dummy-api-test/pages/DummyApiTestPage";
import { ROUTE_PATHS } from "./routes";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.HOME} element={<WebsiteAnalysisPage />} />
      <Route
        path={ROUTE_PATHS.DYNAMIC_API_TEST}
        element={<DynamicApiTestPage />}
      />
      <Route path={ROUTE_PATHS.DUMMY_API_TEST} element={<DummyApiTestPage />} />
    </Routes>
  );
};

export default AppRoutes;
