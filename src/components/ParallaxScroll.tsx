import React, { useEffect, useRef, useState } from "react";

const images = [
    "/mountains.jpg",
    "/mountains-with-lake.jpg",
    "/hiking.jpg",
];

export default function ParallaxScroll() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const ticking = useRef(false);

    const totalSlides = images.length;
    const scrollSensitivity = 30;
    const slideLockTime = 600;

    const backgroundsRef = useRef<HTMLDivElement[]>([]);

    const slideTimeout = () => {
        ticking.current = true;
        setTimeout(() => {
            ticking.current = false;
        }, slideLockTime);
    };


    useEffect(() => {
        backgroundsRef.current.forEach((el, i) => {
            if (i > 0) {
                el.classList.add("up-scroll");
            }
        });
    }, []);

    const handleScroll = (e: WheelEvent) => {
        const delta = e.deltaY;

        if (!ticking.current) {
            if (delta > scrollSensitivity && currentSlide < totalSlides - 1) {
                goToNextSlide();
                slideTimeout();
            } else if (delta < -scrollSensitivity && currentSlide > 0) {
                goToPreviousSlide();
                slideTimeout();
            }
        }
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => {
            const newSlide = prev + 1;

            // Step 1: Pre-assign up-scroll to the new slide (if it's not already)
            const nextEl = backgroundsRef.current[newSlide];
        if (nextEl) {
            nextEl.classList.remove("down-scroll");
            nextEl.classList.add("up-scroll");
        }

        // Step 2: Apply transitions to all slides
        updateSlideClasses(newSlide, "down");

        return newSlide;
        });
    };

    const goToPreviousSlide = () => {
        setCurrentSlide((prev) => {
            const newSlide = prev - 1;

            // Pre-assign down-scroll to previous (if not already)
            const prevEl = backgroundsRef.current[newSlide];
        if (prevEl) {
            prevEl.classList.remove("up-scroll");
            prevEl.classList.add("down-scroll");
        }

        updateSlideClasses(newSlide, "up");

        return newSlide;
        });
    };

    const updateSlideClasses = (index: number, direction: "up" | "down") => {
        console.log(`updateSlideClasses index: ${index}`);
        backgroundsRef.current.forEach((el, i) => {
            el.classList.remove("up-scroll", "down-scroll", "delay-200");
            if (i < index) {
                el.classList.add("down-scroll");
                if (direction === "up") {
                    el.classList.add("delay-200");
                }
            } else if (i > index) {
                el.classList.add("up-scroll");
            }
        });
    };


    function ScrollIndicator() {
        return (
            <div className="absolute bottom-[3rem] left-1/2 -translate-x-1/2 mt-13 animate-bounce text-white z-50">
            <svg
            xmlns="http://www.w3.org/2000/svg"
                width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <polyline points="6 9 12 15 18 9" />
            </svg>
            </div>
        );
    };

    function Slide1() {
        return (
            <div className="relative h-screen w-screen">
            {/* Centered title and tagline */}
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Highpine Reserve
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-white/90 italic tracking-wide">
            A place above it all.
                </p>
            </div>

            {/* Absolutely positioned scroll indicator at bottom */}
            <ScrollIndicator />
            </div>
        );
    }

    function Slide2() {
        return (
            <div className="normal-case w-full flex justify-center px-4">
            <div className="w-1/2 max-w-3xl md:w-1/2 bg-white/90 text-gray-800 px-6 py-8 rounded-2xl shadow-xl backdrop-blur-sm">
            <p className="text-base leading-relaxed">
            Nestled in the towering evergreens of the northern ridge, Highpine offers a peaceful escape into the heart of untouched wilderness. Breathe in the crisp mountain air, wander beneath sunlit canopies, and rediscover what it means to truly unwind.
                </p>
            </div>
            </div>
        );
    };

    function Slide3() {
        return (
            <div className="normal-case w-full flex justify-center px-4">
            <div className="w-1/2 max-w-3xl md:w-1/2 bg-white/90 text-gray-800 px-6 py-8 rounded-2xl shadow-xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-center">About Highpine</h2>
            <p className="text-base leading-relaxed">
            Perched above the lowlands, hidden among tall pines and quiet trails, Highpine Reserve is a place to disconnect — and reconnect. Whether you're pitching a tent under the stars or waking up in a cozy hillside cabin, every corner of the reserve invites you to slow down and breathe deeper.
                </p>
            <p className="text-base leading-relaxed">
            Our forests are thick with cedar, moss, and mystery. The trails? Winding, scenic, and just challenging enough to earn your campfire supper. And the nights? Silent, starlit, unforgettable.
                </p>
            <p className="text-base leading-relaxed">
            Whether you're here for solitude, adventure, or something in between, Highpine Reserve is more than a destination. It’s a return to something simpler.
                    </p>
                <p className="text-base font-bold leading-relaxed">
            Welcome to a place above it all.
                </p>
            </div>
            </div>
        );
    };

    function renderSlide(i: number) {
        switch (i) {
            case 0: {
                return Slide1();
            }
            case 1: {
                return Slide2();
            }
            case 2: {
                return Slide3();
            }
        }
    };

    useEffect(() => {
        window.addEventListener("wheel", handleScroll, { passive: true });
        return () => window.removeEventListener("wheel", handleScroll);
    }, [currentSlide]);

    return (
        <div className="relative h-screen w-screen overflow-hidden font-mono text-white uppercase">
        {images.map((src, i) => (
            <div
            key={i}
            ref={(el) => {
                if (el) backgroundsRef.current[i] = el;
            }}
            className="parallax-slide transition-transform duration-[1200ms] delay-0 absolute top-0 left-0 h-[110vh] w-screen bg-cover bg-center transition-transform duration-[1200ms] will-change-transform"
            style={{ backgroundImage: `url(${src})`, zIndex: totalSlides - i }}
            >
                {/* Content wrapper */}
                <div className="relative z-10 flex h-[110vh] items-center justify-center text-center backdrop-brightness-50">
                {renderSlide(i)}
                </div>
            </div>
        ))}
        </div>
    );
}

