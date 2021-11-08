import { useState, useEffect } from "react";
import axios from "axios";
import { Container, InputGroup, Card, Row, Col } from "react-bootstrap";

function CatList() {
  const [cats, setCats] = useState([]);
  const [catsTemp, setcatsTemp] = useState([]);

  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  console.log(input);
  // console.log(CatList);
  useEffect(() => {
    axios("https://api.thecatapi.com/v1/breeds")
    .then((result) => {
      setCats(result.data);
      setcatsTemp(result.data);
    });
    // console.log(setCats);
    // console.log(setcatsTemp);
  }, []);

  // useEffect baru untuk filtered catsTemp
  useEffect(() => {
    const filterInput = catsTemp.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setCats(filterInput);
    console.log(filterInput);
  }, [input]);

  return (
    <Container fluid="md">
      <InputGroup size="lg" className="mb-4 mt-4 justify-content-md-center">
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={handleChange}
        />
      </InputGroup>
      <Row xs={1} md={4} className="g-4">
        {cats.map((item) => (
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src={item.image?.url}
                alt="img"
                width="200"
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default CatList;
