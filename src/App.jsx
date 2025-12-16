import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router";
import Canvas from "./Canvas";
import PerfumePage from "./PerfumePage";
import ReactLenis from "lenis/react";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Canvas />,
  },
  {
    path: "/:perfumeId",
    element: <PerfumePage />,
  },
]);

function App() {
  return (
    <>
      <ReactLenis root />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
