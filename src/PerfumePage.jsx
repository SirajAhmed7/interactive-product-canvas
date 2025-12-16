import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router";

function PerfumePage() {
  const { perfumeId } = useParams();
  const scopeRef = useRef(null);
  const gridRef = useRef(null);
  const LeftRef = useRef(null);
  const rightRef = useRef(null);
  const navigate = useNavigate();

  const perfumeIdNumber = perfumeId.split("-").at(-1);

  const { contextSafe } = useGSAP(
    () => {
      gsap.to([LeftRef.current, rightRef.current], {
        opacity: 1,
        duration: 1.5,
        // ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: scopeRef }
  );

  const onClick = contextSafe(() => {
    // gsap.set(".perfume-page-main", {
    //   backgroundColor: "transparent",
    // });
    const tl = gsap.timeline();

    tl.to(".perfume-page-main", {
      yPercent: 100,
      // opacity: 0,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        navigate(-1);
      },
    });
    tl.to(
      ".perfume-grid",
      {
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
      },
      "<"
    );
    tl.to(
      ".transition-overlay",
      {
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
      },
      "<"
    );
    // tl.to(
    //   ".transition-bg",
    //   {
    //     scaleY: 0,
    //     duration: 0.6,
    //     ease: "power3.inOut",
    //     onComplete: () => {
    //       navigate(-1);
    //     },
    //   },
    //   ">-0,2"
    // );
  });

  return (
    <div ref={scopeRef} className="h-screen overflow-clip">
      <main className="perfume-page-main min-h-screen max-h-screen h-9999 p-5 bg-stone-50">
        <div
          ref={gridRef}
          className="perfume-grid container mx-auto h-full grid grid-cols-[1fr_512px_1fr] gap-8 content-center"
        >
          <div ref={LeftRef} className="space-y-4 opacity-0">
            <button
              className="font-light text-gray-800 flex items-center gap-3 cursor-pointer"
              onClick={onClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="size-4.5"
              >
                <path
                  d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                  data-name="4-Arrow Left"
                />
              </svg>
              <span>Back</span>
            </button>
            <h1 className="text-7xl font-bold text-gray-900">
              Perfume {perfumeIdNumber}
            </h1>
          </div>
          <div className="w-full aspect-4/5 relative">
            <img
              src={`/perfumes/${perfumeId}.jpg`}
              alt={`Perfume ${perfumeIdNumber}`}
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
            />
          </div>

          <div ref={rightRef} className="space-y-5 self-end opacity-0">
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              suscipit asperiores, dicta magnam corrupti, ratione repudiandae
              earum similique excepturi fugiat quae, voluptatum dolorum
              consequatur nihil. Id sint unde perspiciatis quae, dolorem magni
              qui explicabo repellendus, ex sunt, eos dignissimos dolor?
            </p>

            <button className="w-full bg-gray-900 text-gray-50 text-xl font-medium uppercase flex items-center justify-center p-4">
              Buy now
            </button>
          </div>
        </div>
      </main>
      <div className="fixed top-0 left-0 h-screen w-screen bg-stone-50 bg-[url(/triangular-pattern.png)] bg-repeat bg-left -z-10">
        <div className="transition-overlay absolute inset-0 bg-black/50"></div>
        {/* <div className="transition-bg absolute top-0 left-0 w-full h-full bg-stone-50 origin-bottom"></div> */}
      </div>
    </div>
  );
}

export default PerfumePage;
