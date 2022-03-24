import { useState } from "react";

function Carousel({ slides, height }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="k-carousel" tabIndex="-1">
      <button
        disabled={current === 0}
        onClick={() => setCurrent(current - 1)}
        type="button"
        className="k-carousel-arrow k-carousel-arrow-prev"
      >
        <i className="k-icon-arrow-left-bold k-icon-color-primary-accent"></i>
      </button>
      <div
        style={{ height: height + "px" }}
        className="k-carousel-boxes-wrapper"
      >
        {slides.map(({ img, text }, i) => {
          return (
            <div key={i}
              style={{
                left: i - current + "00%",
                backgroundImage: `url(${img})`,
              }}
              className="k-react-carousel-box k-width-100"
            >
              <h1>{text}</h1>
            </div>
          );
        })}
      </div>
      <button
        disabled={current === slides.length - 1}
        onClick={() => setCurrent(current + 1)}
        type="button"
        className="k-carousel-arrow k-carousel-arrow-next"
      >
        <i className="k-icon-arrow-right-bold k-icon-color-primary-accent"></i>
      </button>
      <ul className="k-carousel-dots-wrapper">
        {slides.map((_, i) => {
          const active = current === i ? { backgroundColor: "#fc4d12" } : {};
          return (
            <li key={i}
              onClick={() => setCurrent(i)}
              style={active}
              className="k-carousel-dot"
            ></li>
          );
        })}
      </ul>
    </div>
  );
}

export default Carousel;
