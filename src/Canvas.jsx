import { useRef } from "react";
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasItem from "./CanvasItem";

gsap.registerPlugin(ScrollTrigger);

// Using top and left to position the items
// Consider 3% padding in each side
// const itemsCoordsPercent = [
//   {
//     x: 7,
//     y: 5,
//   },
//   {
//     x: 16,
//     y: 12,
//   },
//   {
//     x: 7,
//     y: 40,
//   },
//   {
//     x: 7,
//     y: 80,
//   },
//   {
//     x: 24,
//     y: 30,
//   },
//   {
//     x: 30,
//     y: 60,
//   },
//   {
//     x: 38,
//     y: 45,
//   },
//   {
//     x: 40,
//     y: 64,
//   },
//   {
//     x: 30,
//     y: 12,
//   },
//   {
//     x: 18,
//     y: 50,
//   },
//   {
//     x: 13,
//     y: 70,
//   },
//   {
//     x: 40,
//     y: 24,
//   },
//   {
//     x: 27,
//     y: 78,
//   },
//   {
//     x: 50,
//     y: 55,
//   },
//   {
//     x: 46,
//     y: 82,
//   },
// ];

const itemsCoordsPercent = [
  { x: 8, y: 12 },
  { x: 28, y: 8 },
  { x: 52, y: 15 },
  { x: 78, y: 18 },
  { x: 92, y: 25 },
  { x: 18, y: 30 },
  { x: 42, y: 28 },
  { x: 68, y: 35 },
  { x: 85, y: 40 },
  { x: 5, y: 48 },
  { x: 32, y: 45 },
  { x: 58, y: 52 },
  { x: 14, y: 50 },
  { x: 22, y: 62 },
  { x: 44, y: 54 },
  { x: 70, y: 66 },
  { x: 90, y: 72 },
  { x: 12, y: 75 },
  { x: 38, y: 78 },
  { x: 62, y: 82 },
  { x: 80, y: 85 },
  { x: 25, y: 87 },
  { x: 57, y: 26 },
  { x: 81, y: 54 },
  { x: 50, y: 72 },
];

function Canvas() {
  const mainWrapper = useRef(null);
  const productsContainer = useRef(null);
  // const blocker = useBlocker(false);

  useGSAP(
    (context, contextSafe) => {
      const xTo = gsap.quickTo(productsContainer.current, "x", {
        duration: 4,
        ease: "power3",
      });
      const yTo = gsap.quickTo(productsContainer.current, "y", {
        duration: 4,
        ease: "power3",
      });

      const perfumes = gsap.utils.toArray(".perfume");

      const proximityRadius = 550;
      const minScale = 1;
      const maxScale = 1.8;

      const mouse = {
        x: null,
        y: null,
      };

      const canvasWidth = productsContainer.current.clientWidth;
      const canvasHeight = productsContainer.current.clientHeight;

      // gsap.set(productsContainer.current, { x: "-50%", y: "-50%" });
      gsap.set(productsContainer.current, {
        xPercent: -50,
        yPercent: -50,
      });

      const onMouseMove = contextSafe((e) => {
        const { clientX, clientY } = e;

        const x = (0.5 - (1 - clientX / window.innerWidth)) * 2; // Value between -1 and 1
        const y = (0.5 - (1 - clientY / window.innerHeight)) * 2; // Value between -1 and 1

        // 200screen
        // xTo(-((canvasWidth / 4) * x));
        // yTo(-((canvasHeight / 4) * y));

        // 400screen
        // xTo(-((canvasWidth / 2) * x * 0.75));
        // yTo(-((canvasHeight / 2) * y * 0.75));
        // xTo(-((canvasWidth / 3) * x));
        // yTo(-((canvasHeight / 3) * y));

        // 300screen
        xTo(-((canvasWidth / 3) * x));
        yTo(-((canvasHeight / 3) * y));

        mouse.x = e.pageX;
        mouse.y = e.pageY;
      });

      let scaleAnimationId;

      const itemsScaling = contextSafe(() => {
        if (!mouse.x || !mouse.y) {
          scaleAnimationId = requestAnimationFrame(itemsScaling);
          return;
        }

        perfumes.forEach((item) => {
          const rect = item.getBoundingClientRect();

          const proximityRadiusArea = {
            left: rect.left - (proximityRadius - rect.width / 2),
            right: rect.right + (proximityRadius - rect.width / 2),
            top: rect.top - (proximityRadius - rect.height / 2),
            bottom: rect.bottom + (proximityRadius - rect.height / 2),
          };

          const inRect =
            mouse.x > proximityRadiusArea.left &&
            mouse.x < proximityRadiusArea.right &&
            mouse.y > proximityRadiusArea.top &&
            mouse.y < proximityRadiusArea.bottom;

          if (inRect) {
            const itemCenter = {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            };

            const distance = Math.sqrt(
              Math.pow(itemCenter.x - mouse.x, 2) +
                Math.pow(itemCenter.y - mouse.y, 2)
            );

            const scale = gsap.utils.mapRange(
              0,
              proximityRadius,
              maxScale,
              minScale
            )(distance);

            gsap.to(item, {
              scale: scale,
              duration: 3,
              ease: "power3",
              overwrite: "auto",
            });
          }
        });

        scaleAnimationId = requestAnimationFrame(itemsScaling);
      });

      itemsScaling();

      window.addEventListener("mousemove", onMouseMove);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(scaleAnimationId);
        scaleAnimationId = undefined;
      };
    },
    { scope: mainWrapper }
  );

  return (
    <>
      <main
        ref={mainWrapper}
        className="min-h-screen max-h-screen bg-stone-50 bg-[url(/triangular-pattern.png)] text-white bg-repeat bg-left overflow-clip relative"
      >
        <div
          ref={productsContainer}
          // className="absolute top-1/2 left-1/2 w-[400vw] h-[400vh] bg-[url(/bison.jpg)] bg-center bg-cover border-40 border-red-500 border-solid"
          className="absolute top-1/2 left-1/2 w-[300vw] h-[300vh]"
        >
          {itemsCoordsPercent.map((item, i) => (
            <CanvasItem
              item={item}
              i={i}
              // blocker={blocker}
              key={`perfume-${i + 1}`}
            />
          ))}
        </div>
      </main>
      <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center pointer-events-none">
        <div className="transition-overlay absolute inset-0 bg-black/50 opacity-0"></div>
        <div className="transition-bg absolute inset-0 bg-stone-50 origin-bottom scale-y-0"></div>
        <div className="transition-img-container w-lg aspect-4/5 relative">
          {/* <img
            src={`/perfumes/${perfumeId}.jpg`}
            alt={`Perfume ${perfumeIdNumber}`}
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          /> */}
        </div>
      </div>
    </>
  );
}

export default Canvas;
