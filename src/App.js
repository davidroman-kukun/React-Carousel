import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "./components/Carousel";

const slides = [
  {
    text: "Kitchen Island Size Guidelines",
    img: "https://content.mykukun.com/wp-content/uploads/2019/06/07120825/kitchen-island-size-guidelines.jpg",
  },
  {
    text: "Bathroom Remodel Estimate",
    img: "https://content.mykukun.com/wp-content/uploads/2021/02/25011604/Bathroom-remodel-estimate.jpg",
  },
  {
    text: "Landscape Maintenance",
    img: "https://content.mykukun.com/wp-content/uploads/2021/02/24113301/landscape-maintenance.jpg",
  },

];

function App() {
  const [height, setHeight] = useState(400);
  const [autoplay, setAutoplay] = useState(true);
  const [dots, setDots] = useState(true);
  const [arrowOpacity, setArrowOpacity] = useState(99);
  const [speed, setSpeed] = useState(4)

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col>
          <h2>Carousel</h2>
          <hr />
          <Carousel
            height={height}
            slides={slides}
            boxSpacing={false}
            arrowOpacity={arrowOpacity}
            autoplay={autoplay}
            dots={dots}
            draggable={false}
            speed={speed}
          ></Carousel>
        </Col>
        <Col md={4}>
          <h2>Options</h2>
          <hr />
          <Form.Label>arrowOpacity: {arrowOpacity}%</Form.Label>
          <Form.Range
            value={arrowOpacity}
            onChange={({ target }) => {
              if (target.value < 100) setArrowOpacity(target.value);
            }}
          />
          <Form.Label>height: {height} px</Form.Label>
          <Form.Control
            min="0"
            max="800"
            value={height}
            onChange={({ target }) => setHeight(target.value)}
            type="number"
          ></Form.Control>
          <Form.Check
            className="py-2"
            type="switch"
            checked={autoplay}
            onChange={({ target }) => setAutoplay(target.checked)}
            label={"autoplay - " + autoplay}
          />
          <Form.Check
            className="py-2"
            type="switch"
            checked={dots}
            onChange={({ target }) => setDots(target.checked)}
            label={"dots - " + dots}
          />
          <Form.Label>speed: {speed} Sec.</Form.Label>
          <Form.Control
            min="1"
            max="10"
            value={speed}
            onChange={({ target }) => setSpeed(target.value)}
            type="number"
          ></Form.Control>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
