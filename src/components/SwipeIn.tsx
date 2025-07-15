import React, { useEffect, useRef } from "react";

const images = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  src: `https://raw.githubusercontent.com/codrops/HoverEffectIdeas/master/img/${i + 1}.jpg`,
}));

export default function ImagePollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
            const el = target as HTMLElement;
          if (isIntersecting) {
            el.classList.add("in-view");

            // Remove directional transform classes
            el.classList.remove("translate-x-[75%]");
            el.classList.remove("-translate-x-[75%]");
          } else {
            el.classList.remove("in-view");

            // Re-add original transform class if needed (optional)
            if (el.dataset.slideDirection === "right") {
              el.classList.add("translate-x-[75%]");
            } else {
              el.classList.add("-translate-x-[75%]");
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.15,
      }
    );

    const elements = containerRef.current?.querySelectorAll(".view-poll") || [];
    elements.forEach((el) => {
        console.log("observing:", el);
        observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main ref={containerRef} className="mx-auto max-w-screen-lg px-4 py-12 overflow-x-hidden">
      {images.map(({ id, src }, i) => (
        <div
          key={id}
          data-slide-direction={i % 2 === 0 ? "left" : "right"}
          className={`view-poll mb-12 flex flex-wrap items-end ease-in-out opacity-0 transition-all max-w-full overflow-hidden duration-1000 ${
            i % 2 === 0
              ? "-translate-x-[75%]"
              : "translate-x-[75%] flex-row-reverse"
          }`}
        >
          <picture className="min-w-[240px] flex-[2]">
            <img src={src} alt="" className="w-full object-cover" />
          </picture>
          <div className="flex-1 p-6">
            <h1 className="font-serif text-2xl font-bold leading-tight text-gray-900">
              Lorem ipsum dolor sit amet.
            </h1>
            <h2 className="font-serif italic text-lg text-gray-500">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
              non voluptatem dolore repellendus eaque fugiat, minima, iure
              asperiores ratione eum ea magni ex. Aut aperiam rem incidunt vero
              aliquid consequatur!
            </p>
          </div>
        </div>
      ))}
    </main>
  );
}
