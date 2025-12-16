import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useParams } from "react-router";

function PerfumePage() {
  const { perfumeId } = useParams();
  const gridRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  const perfumeIdNumber = perfumeId.split("-").at(-1);

  useGSAP(() => {
    gsap.to([headingRef.current, paragraphRef.current], {
      opacity: 1,
      duration: 1.5,
      // ease: "power3.out",
      delay: 0.2,
    });
  });

  return (
    <main className="min-h-screen max-h-screen h-9999 p-5 bg-stone-50">
      <div
        ref={gridRef}
        className="container mx-auto h-full grid grid-cols-[1fr_512px_1fr] gap-8 content-center"
      >
        <h1
          ref={headingRef}
          className="text-7xl font-bold text-gray-900 opacity-0"
        >
          Perfume {perfumeIdNumber}
        </h1>
        <div className="w-full aspect-4/5 relative">
          <img
            src={`/perfumes/${perfumeId}.jpg`}
            alt={`Perfume ${perfumeIdNumber}`}
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          />
        </div>
        <p ref={paragraphRef} className="self-end text-gray-700 opacity-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure suscipit
          asperiores, dicta magnam corrupti, ratione repudiandae earum similique
          excepturi fugiat quae, voluptatum dolorum consequatur nihil. Id sint
          unde perspiciatis quae, dolorem magni qui explicabo repellendus, ex
          sunt, eos dignissimos dolor?
        </p>
      </div>
    </main>
  );
}

export default PerfumePage;
