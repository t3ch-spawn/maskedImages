import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import pic1 from "./assets/pic1.jpg";
import pic2 from "./assets/pic2.jpg";
import pic3 from "./assets/pic3.jpg";
import pic4 from "./assets/pic4.jpg";
import pic5 from "./assets/pic5.jpg";
import pic6 from "./assets/pic6.jpg";
import pic7 from "./assets/pic7.jpg";
import pic8 from "./assets/pic8.jpg";
import Lenis from "lenis";
import SplitType from "split-type";

function App() {
  const [count, setCount] = useState(0);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
  });

  useGSAP(() => {
    const split = new SplitType(" .bg-anim, .featured", {
      types: "words,chars, line",
    });

    const featuredText = document.querySelector(".featured");

    const featuredChars = featuredText.querySelectorAll(".char");
    gsap.to(featuredText, {
      y: "-100%",
      scrollTrigger: {
        trigger: featuredText,
        scrub: true,
        // toggleActions: "play none reverse reverse",
        start: "top 30%",
        end: "bottom 30%",
        // markers: true,
      },
    });

    const bgHeadings = document.querySelectorAll(".bg-anim");
    // This is for animation that have a masked color reveal effect, it animates the background stop value
    bgHeadings.forEach((heading, idx) => {
      gsap.from(heading, {
        x: (idx + 1) % 2 == 0 ? "130%" : "-130%",
        scrollTrigger: {
          trigger: heading,
          scrub: true,
          start: "top 50%",
        },
      });

      const words = heading.querySelectorAll(".word");
      gsap.to(words, {
        duration: 1,
        ease: "power2.inOut",
        "--stop": "100%",
        stagger: 0.1,
        scrollTrigger: {
          trigger: heading,
          scrub: 1,
          start: "top 50%",
        },
      });
    });

    // Footer parallax
    gsap.from(".footer-text", {
      y: -700,
      scrollTrigger: {
        trigger: "footer",
        scrub: true,
        start: "top 80%",
        end: "bottom bottom",
        // markers: true,
      },
    });
  });

  return (
    <>
      <main className="boxes-container w-[100%] relative z-[4]">
        <div className="bg-[white] h-[100vh] flex justify-center items-center w-[]">
          <div className="overflow-hidden pb-[30px] relative top-[200px]">
            <h1 className="text-black fette featured text-[80px] -768:text-[50px] max-w-[800px] text-center leading-[110%]">
              Featured something something...
            </h1>
          </div>
        </div>

        <ClippedComponent img={pic6} word="The Alps" />
        <SkewedComponent img={pic1} id={2} word="Paradise" />
        <SkewedComponent img={pic3} id={3} word="Metropolis" />
        <ClippedComponent img={pic2} id={4} word="Traveler" />
        <ClippedComponent img={pic4} id={5} word="Duality" />
        <SkewedComponent img={pic5} id={6} word="Autumn" />
        <SkewedComponent img={pic7} id={7} word="Discovery" />
        <ClippedComponent img={pic8} id={8} word="Pilgrimage" />
      </main>
      <div className="h-[0vh]"></div>
      <footer className="text-black fette flex justify-center items-center text-[80px]  text-center leading-[110%] h-[100vh]  w-full">
        <div className="footer-text text-center"> A regular footer</div>
      </footer>
    </>
  );
}

export default App;

function SkewedComponent({ img, id, word }) {
  const parentRef = useRef(null);
  const windowRef = useRef(null);
  const backgroundRef = useRef(null);

  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          scrub: true,
          end: "bottom 70%",
          // start: "top 90%",
        },
      })
      .to(windowRef.current, {
        y: 0,
        height: "100%",
        width: "100%",
        duration: 4,
        x: 0,
      })
      .to(
        backgroundRef.current,
        {
          transform: "rotateX(0deg) rotateY(0deg)",
          duration: 4,
          // y: 0,
        },
        "<"
      );
  });

  return (
    <>
      <div
        ref={parentRef}
        className="mask-parent w-[100%] sticky top-0 overflow-hidden"
      >
        <svg width="0" height="0" className="absolute h-[100%] w-[100%] ">
          <mask id={`reveal-mask${id}`} className="">
            <g className="g-group h-[100%] w-[100%] border-[10px] border-[red]">
              {" "}
              <rect
                className="h-[700px] w-[700px]  absolute  translate-x-[63vw] translate-y-[70vh]  "
                id="mask-window"
                ref={windowRef}
                fill="white"
              />
            </g>
          </mask>
        </svg>

        <div
          ref={backgroundRef}
          style={{
            mask: `url(#reveal-mask${id})`,
            clipPath: `url(#test-clip)`,
            transform: `rotateX(${
              id % 2 === 0 ? "-50deg" : "50deg"
            }) rotateY(25deg)`,
          }}
          className="mask-background w-[100%] h-[100vh] sticky top-0 overflow-hidden  origin-center"
        >
          <div className="centralise absolute w-fit -1024:w-[95%] px-[80px] h-[400px] flex justify-center items-center overflow-hidden">
            <h1 className="fette bg-anim text-[100px] white">{word}</h1>
          </div>
          <img src={img} className="w-full h-full object-cover spider" alt="" />
        </div>
      </div>

      <div className="bg-[white] h-[10vh] w-[]"></div>
    </>
  );
}

function ClippedComponent({ img, id, word }) {
  const clipRef = useRef(null);

  useGSAP(() => {
    gsap.to(clipRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      delay: 1,
      duration: 3,
      scrollTrigger: {
        trigger: clipRef.current,
        scrub: true,
        // end: "bottom bottom",
        start: "top 70%",
      },
    });
  });

  return (
    <>
      {" "}
      <div
        style={{
          clipPath:
            id % 2 == 0
              ? "polygon(47.36% 183.67%, 52.64% 110%, 35.28% 147.35%, 64.72% 147.35% )"
              : "polygon(58.77% 80%, 45.31% 121.02%, 82.69% 142.05%, 17.38% 142.05%)",
        }}
        ref={clipRef}
        className="path-test sticky top-0 h-[100vh] w-[100%]"
      >
        <div className="centralise absolute -1024:w-[95%] w-fit px-[80px] h-[400px] flex justify-center items-center overflow-hidden">
          <h1 className="fette bg-anim text-[100px] white">{word}</h1>
        </div>
        <img src={img} className="w-full h-full object-cover " alt="" />
      </div>
      <div className="bg-[white] h-[120vh] w-[]"></div>
    </>
  );
}

{
  /* <svg width="0" height="0" className="absolute">
  <mask id="reveal-mask">
    <g id="mask-group" transform="rotateY(0)">
      <rect x="0" y="0" width="400" height="400" fill="white" />
    </g>
  </mask>
</svg>; */
}
