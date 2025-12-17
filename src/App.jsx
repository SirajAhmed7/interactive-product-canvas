import ReactLenis from "lenis/react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Canvas from "./Canvas";
import PerfumePage from "./PerfumePage";

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
