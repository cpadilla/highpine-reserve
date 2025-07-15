import ParallaxScroll from "./components/ParallaxScroll";
import SwipeIn from "./components/SwipeIn";
import React, { useState } from "react";
import './App.css'

function App() {

    const images = [
        "/mountains.jpg",
        "/mountains-with-lake.jpg",
        "/hiking.jpg",
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <>
          <ParallaxScroll onSlideChange={setCurrentSlide} images={images} />
          {currentSlide === images.length - 1 && <SwipeIn />}
        </>
    )
}

export default App
