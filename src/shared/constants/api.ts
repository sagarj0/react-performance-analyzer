import type { ApiEndpoint, PerformanceThresholds } from "../types/performance";

export const DUMMY_API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: "jsonplaceholder-posts",
    name: "JSONPlaceholder Posts",
    url: "https://jsonplaceholder.typicode.com/posts",
    description: "Fake REST API for testing and prototyping - Posts collection",
    category: "Testing",
    method: "GET",
  },
  {
    id: "jsonplaceholder-users",
    name: "JSONPlaceholder Users",
    url: "https://jsonplaceholder.typicode.com/users",
    description: "Fake REST API for testing and prototyping - Users collection",
    category: "Testing",
    method: "GET",
  },
  {
    id: "jsonplaceholder-single-post",
    name: "JSONPlaceholder Single Post",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    description: "Fetch a single post by ID for performance testing",
    category: "Testing",
    method: "GET",
  },
  {
    id: "rest-countries",
    name: "REST Countries",
    url: "https://restcountries.com/v3.1/all",
    description: "Get comprehensive information about all countries worldwide",
    category: "Geography",
    method: "GET",
  },
  {
    id: "rest-countries-name",
    name: "REST Countries by Name",
    url: "https://restcountries.com/v3.1/name/united",
    description:
      'Search countries by name - returns countries containing "united"',
    category: "Geography",
    method: "GET",
  },
  {
    id: "cat-fact",
    name: "Cat Facts API",
    url: "https://catfact.ninja/fact",
    description: "Get random interesting facts about cats",
    category: "Entertainment",
    method: "GET",
  },
  {
    id: "dog-ceo",
    name: "Dog CEO Random Image",
    url: "https://dog.ceo/api/breeds/image/random",
    description: "Get random dog images from various breeds",
    category: "Entertainment",
    method: "GET",
  },
  {
    id: "dog-breeds",
    name: "Dog Breeds List",
    url: "https://dog.ceo/api/breeds/list/all",
    description: "Get a complete list of all available dog breeds",
    category: "Entertainment",
    method: "GET",
  },
  {
    id: "openweather-sample",
    name: "OpenWeatherMap Sample",
    url: "https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b6907d289e10d714a6e88b30761fae22",
    description: "Sample weather data for London (demo API key)",
    category: "Weather",
    method: "GET",
  },
  {
    id: "httpbin-get",
    name: "HTTPBin GET Test",
    url: "https://httpbin.org/get",
    description: "HTTP testing service - returns request data in JSON format",
    category: "Testing",
    method: "GET",
  },
  {
    id: "httpbin-delay",
    name: "HTTPBin Delay Test",
    url: "https://httpbin.org/delay/2",
    description:
      "HTTP testing service with 2-second delay for performance testing",
    category: "Testing",
    method: "GET",
  },
  {
    id: "reqres-users",
    name: "ReqRes Users",
    url: "https://reqres.in/api/users",
    description: "Test REST API with user data for development testing",
    category: "Testing",
    method: "GET",
  },
];

export const PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  loadTime: {
    good: 1000, // < 1s is excellent
    poor: 3000, // > 3s is poor
  },
  pageSize: {
    good: 512, // < 512KB is good
    poor: 2048, // > 2MB is poor
  },
  requestCount: {
    good: 20, // < 20 requests is good
    poor: 50, // > 50 requests is poor
  },
};

export const API_CATEGORIES = [
  "All",
  "Testing",
  "Geography",
  "Entertainment",
  "Weather",
] as const;
