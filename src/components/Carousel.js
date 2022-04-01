import { useState, useEffect } from "react";

function Carousel({ slides, height, autoplay, dots, arrowOpacity, speed }) {
  const [current, setCurrent] = useState(0);

  const [hover, setHover] = useState(false);
  const [leftWrapper, setLeftWrapper] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const [first, setFirst] = useState("");

  const right = current === slides.length - 1 ? 0 : current + 1;
  const left = current === 0 ? slides.length - 1 : current - 1;

  let startX;
  const getCss = (i) =>
    i === current
      ? "current"
      : i === right
      ? "right"
      : i === left
      ? "left"
      : "";

  const resetLeftWrapper = () => {
    let i = leftWrapper;
    var reset = setInterval(function () {
      i < 0 ? i++ : i--;
      setLeftWrapper(i);
      if (i === 0) clearInterval(reset);
    }, 5);
  };

  const onMouseLeave = () => {
    setHover(false);
    setMouseDown(false);
  };

  const onMouseMove = (e) => {
    e.preventDefault();
    let i = 0;
    if (mouseDown) {
      i = e.movementX > 0 ? leftWrapper + 7 : leftWrapper - 7;
      if (i > -60 && i < 60) setLeftWrapper(i);
      else {
        const next = i < 0 ? right : left;
        setCurrent(next);
        resetLeftWrapper();
        setMouseDown(false);
      }
    }
  };
  let time = null;
  useEffect(() => {
    time = setTimeout(() => setCurrent(right), speed * 1000);
    //setHover(autoplay);
    return autoplay && !hover ? time : clearTimeout(time);
  }, [current, autoplay, hover]);

  return (
    <div
      className="k-carousel"
      tabIndex="-1"
      onMouseEnter={() => {
        setHover(true);
        clearTimeout(time);
      }}
      onMouseLeave={onMouseLeave}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={({ target }) => {
        setMouseDown(false);
        resetLeftWrapper();
        //window.removeEventListener("mousemove", onMouseMove);
      }}
      onMouseMove={onMouseMove}
      onTouchStart={({ changedTouches }) => (startX = changedTouches[0].pageX)}
      onTouchEnd={({ changedTouches }) =>
        setCurrent(startX > changedTouches[0].pageX ? right : left)
      }
    >
      <button
        onClick={() => setCurrent(left)}
        type="button"
        style={{ opacity: "0." + arrowOpacity }}
        className="k-carousel-arrow k-carousel-arrow-prev"
      >
        <i className="k-icon-arrow-left-bold k-icon-color-primary-accent"></i>
      </button>
      <div
        style={{
          //left: leftWrapper + "%",
          //overflow: "visible",
          height: height + "px",
        }}
        //style={{ height: height + "px" }}
        className="k-carousel-boxes-wrapper"
      >
        {slides.map(({ img, text }, i) => {
          return (
            <div
              key={i}
              style={{
                transform: `translateX(${leftWrapper * 2}px)`,
                backgroundImage: `url(${img})`,
              }}
              className={`k-react-carousel-box k-width-100 ${getCss(i)}`}
            >
              <h1>
                {text}
              </h1>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setCurrent(right)}
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
