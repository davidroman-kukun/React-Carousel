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

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col>
          <h2>Carousel</h2>
          <hr />
          <Carousel height={height} slides={slides}></Carousel>
        </Col>
        <Col md={4}>
          <h2>Options</h2>
          <hr />
          <Form.Control
            min="0"
            max="800"
            value={height}
            onChange={({ target }) => setHeight(target.value)}
            type="number"
          ></Form.Control>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
