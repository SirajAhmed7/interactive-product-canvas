import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useRef } from "react";
import { Link, useNavigate } from "react-router";

gsap.registerPlugin(Flip);

function CanvasItem({ item, i }) {
  const linkRef = useRef(null);
  const navigate = useNavigate();

  const curPerfume = `perfume-${i + 1}`;

  const { contextSafe } = useGSAP();

  // const onClick = useCallback(() => {
  //   contextSafe(() => {
  //     const perfumeImg = document.querySelector(`.${curPerfume}`);

  //     const state = Flip.getState(perfumeImg);

  //     const transitionImgContainer = document.querySelector(
  //       ".page-transition-img-container"
  //     );

  //     transitionImgContainer.appendChild(perfumeImg);

  //     Flip.from(state, {
  //       // scale: true,
  //       duration: 1.2,
  //       ease: "power3.out",
  //       onComplete: () => {
  //         blocker.proceed();
  //       },
  //     });
  //   });
  // }, [blocker, contextSafe, curPerfume]);

  const onClick = contextSafe((e) => {
    e.preventDefault();

    const perfumeImg = document.querySelector(`.${curPerfume}`);

    console.log(curPerfume);

    const state = Flip.getState(perfumeImg);

    const transitionImgContainer = document.querySelector(
      ".transition-img-container"
    );

    transitionImgContainer.appendChild(perfumeImg);

    Flip.from(state, {
      scale: true,
      duration: 1.2,
      ease: "power3.out",
    });

    const tl = gsap.timeline({ delay: 0.6 });

    tl.to(".transition-bg", {
      scaleY: 1,
      duration: 0.6,
      ease: "power3.inOut",
    });
    tl.to(
      ".transition-overlay",
      {
        opacity: 1,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          // console.log(blocker);
          navigate(`/${curPerfume}`);
        },
      },
      "<"
    );
  });

  return (
    <Link
      ref={linkRef}
      to={`/${curPerfume}`}
      className={`perfume link-${curPerfume} absolute w-48 aspect-4/5 cursor-pointer block`}
      style={{
        top: `${item.y}%`,
        left: `${item.x}%`,
      }}
      onClick={onClick}
      key={curPerfume}
    >
      <img
        src={`/perfumes/${curPerfume}.jpg`}
        alt={`Perfume ${i + 1}`}
        className={`${curPerfume} absolute top-0 left-0 w-full h-full object-cover pointer-events-none`}
      />
    </Link>
  );
}

export default CanvasItem;
