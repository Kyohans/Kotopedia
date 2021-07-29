import React, { Component } from "react";
import './Kotodummy.css';
import { 
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Row,
  Col, } from "reactstrap";

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
      },

      kotodummyList: []
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

  renderImage = () => {
    const image = this.id + "_" + this.name + ".jpg";

    return "https://koto-assets.s3.us-east-2.amazonaws.com/assets/thumbs/" +  image;
  }

  /*async getImage() {
    try {
      const res = await fetch('http://localhost:8000/api')
    }
  }*/

  renderPersonalities(personality) {
    console.log(personality);
    switch(personality) {
      case "Cheerful":
        return <img class = "personality" src = "img/Cheerful.png" alt = "Cheerful"/>
      case "Cute":
        return <img class = "personality" src = "img/Cute.png" alt = "Cute"/>
      case "Dark":
        break;
      case "Cool":
        break;
      case "Serious":
        return <img class = "personality" src = "img/Serious.png" alt = "Serious"/>
      default:
        break;
    }
  }

  renderKotodummies = () => {
    const kotodummies = this.state.kotodummyList;

    return kotodummies.map(kotodummy => (
      <Card>
        <CardBody>
          <CardImg src = {kotodummy.map(this.renderImage)} />
          <br/>
          <CardTitle tag = "h4">{kotodummy.name}</CardTitle>
          <hr/>
          <CardText>{kotodummy.stage} {kotodummy.rarity ? ", {kotodummy.rarity}" : "" }</CardText>
          <CardBody>{kotodummy.description}</CardBody>
          <CardText>
            <Row>
              <Col>
                {kotodummy.personality.split(',').map(this.renderPersonalities)}
              </Col>
            </Row>
          </CardText>
        </CardBody>
      </Card>
    ));
  };

  render() {
    return (
      <main className = "content">
        <h1 className = "text-black text-uppercase text-center my-4">Kotodummies</h1>
        <div className = "row">
          <div className = "col-md-6 col-sm-10 mx-auto p-0">
            <div>
              <ul className = "card-grid">
              {this.renderKotodummies()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Kotodummies