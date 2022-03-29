import { useState, useEffect } from "react";

function Carousel({ slides, height, autoplay, dots, arrowOpacity, speed }) {
  const [current, setCurrent] = useState(0);
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);

  const changeSlide = (up) => {
    let type = up ? current + 1 : current - 1;
    if (up && current === slides.length - 1) type = 0;
    if (!up && current === 0) type = slides.length - 1;
    setCurrent(type);
  };

  const onDrag = (e) => {
    if (drag) changeSlide(e.movementX < 0);
  };

  useEffect(() => {
    if (!autoplay) return;
    if (!hover) return setTimeout(() => changeSlide(true), speed * 1000);
  }, [current, autoplay, hover]);

  return (
    <div
      className="k-carousel"
      tabIndex="-1"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setDrag(false);
      }}
      onMouseDown={() => setDrag(true)}
      onMouseUp={() => setDrag(false)}
    >
      <button
        onClick={() => changeSlide(false)}
        type="button"
        style={{ opacity: "0." + arrowOpacity }}
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
            <div
              key={i}
              style={{
                left: (i - current) * 100 + "%",
                backgroundImage: `url(${img})`,
              }}
              onMouseMove={(e) => onDrag(e)}
              onTouchMove={(e) => onDrag(e)}
              className="k-react-carousel-box k-width-100"
            >
              <h1>
                current: {autoplay ? "true" : "false"}
                {100 / arrowOpacity}
              </h1>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => changeSlide(true)}
        type="button"
        style={{ opacity: "0." + arrowOpacity }}
        className="k-carousel-arrow k-carousel-arrow-next"
      >
        <i className="k-icon-arrow-right-bold k-icon-color-primary-accent"></i>
      </button>
      {dots && (
        <ul className="k-carousel-dots-wrapper">
          {slides.map((_, i) => {
            const active = current === i ? { backgroundColor: "#fc4d12" } : {};
            return (
              <li
                key={i}
                onClick={() => setCurrent(i)}
                style={active}
                className="k-carousel-dot"
              ></li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Carousel;
