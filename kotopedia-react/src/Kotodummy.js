import React, { Component } from "react";

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
        rarity: ""
      },

      kotodummyList: []
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/kotodummys')
      const kotodummyList = await res.json();

      this.setState({
        kotodummyList
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderPersonalities = (personalities) => {

  }

  renderKotodummies = () => {
    const items = this.state.kotodummyList;

    return items.map(kotodummy => (
      <li
        key = {kotodummy.no}
        className = "list-group-item d-flex justify-content-between align-items"
      >
        <tr>
          <th>{kotodummy.name}</th>
          <th>{kotodummy.description}</th>
          <th>{kotodummy.personality}</th>
          <th>{kotodummy.stage}</th>
          <th>{kotodummy.rarity}</th>
        </tr>
      </li>
    ));
  };

  render() {
    return (
      <main className = "content">
        <h1 className = "text-white text-uppercase text-center my-4">Kotodummies</h1>
        <div className = "row">
          <div className = "col-md-6 col-sm-10 mx-auto p-0">
            <div className = "card p-3">
              <table className = "mr-2">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Personality</th>
                  <th>Stage</th>
                  <th>Rarity</th>
                </tr>
                {this.renderKotodummies()}
              </table>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Kotodummies