export const ROUTE_PATHS = {
  HOME: "/",
  DYNAMIC_API_TEST: "/dynamic-api-test",
  DUMMY_API_TEST: "/dummy-api-test",
} as const;

export const ROUTE_NAMES = {
  HOME: "Website Analysis",
  DYNAMIC_API_TEST: "Custom API Test",
  DUMMY_API_TEST: "Demo APIs",
} as const;

export const NAVIGATION_ITEMS = [
  {
    key: ROUTE_PATHS.HOME,
    label: ROUTE_NAMES.HOME,
    path: ROUTE_PATHS.HOME,
  },
  {
    key: ROUTE_PATHS.DYNAMIC_API_TEST,
    label: ROUTE_NAMES.DYNAMIC_API_TEST,
    path: ROUTE_PATHS.DYNAMIC_API_TEST,
  },
  {
    key: ROUTE_PATHS.DUMMY_API_TEST,
    label: ROUTE_NAMES.DUMMY_API_TEST,
    path: ROUTE_PATHS.DUMMY_API_TEST,
  },
] as const;
