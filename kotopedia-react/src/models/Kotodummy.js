import React, { Component } from "react";
import './Kotodummy.css';
import { 
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon, } from "reactstrap";

export function renderPersonalities(personality) {
  const path = "img/" + personality + ".png";
  return <img class = "personality" src = {path} alt = {personality}/>
}

class Kotodummies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        no: 0,
        name: "",
        description: "",
        personality: [],
        stage: "",
        rarity: "",
        image: "",
      },

      kotodummyList: [],
      query: ""
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/kotodummys')
      const kotodummyList = await res.json();

      this.setState({ kotodummyList });
    } catch (error) {
      console.log(error);
    }
  }

  renderKotodummies = (query) => {
    const kotodummies = query === "" ? this.state.kotodummyList 
                                    : this.state.kotodummyList.filter(k => (
                                      k.name.toLowerCase().includes(query)
                                      ));

    return kotodummies.map(kotodummy => (
      <Card>
        <CardBody>
          <CardImg class = "kotodummy-image" src = {kotodummy.image ? kotodummy.image : "img/default_kotodummy.png"}/>
            <CardBody class = "kotodummy-card-body">  
              <CardTitle tag = "h4">{kotodummy.name}</CardTitle>
              <hr/>
              <Row>
                <Col>
                  <p class = "kotodummy-stage">
                    {kotodummy.stage}
                  </p>
                </Col>
                <Col>
                  <p class = "kotodummy-rarity">
                    {kotodummy.rarity === '-' ? '' : kotodummy.rarity}
                  </p>
                </Col>
              </Row>
              <p class = "kotodummy-personalities">
                {
                  kotodummy.personality.split(',').map(function (p) {
                    return p.trim();
                  }).map(
                    renderPersonalities
                  )
                }
              </p>
              <div class = "kotodummy-description">{kotodummy.description}</div>
            </CardBody>
        </CardBody>
      </Card>
    ));
  };

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <main className = "content">
        <h1 className = "text-black text-uppercase text-center my-4">Kotodummies</h1>
        <div class = "top-search-div">
          <p>Hello</p>
          <div class = "search-field">
            <InputGroup>
              <InputGroupAddon addonType = "prepend">
                <div class = "unselectable">
                  <InputGroupText class = "unselectable">🔍</InputGroupText>
                </div>
              </InputGroupAddon>
              <Input placeholder = "Search kotodummies..." class = "search-field" name = "query" type = "text" value = {this.state.query} onChange = {this.inputHandler}/>
            </InputGroup>
          </div>
        </div>
        <div className = "card-row">
          <div className = "col-md-8 col-sm-10 mx-auto p-0">
            <div>
              <ul className = "card-grid">
                {this.renderKotodummies(this.state.query)}
              </ul>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Kotodummies