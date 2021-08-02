import React, { Component } from "react";
import { Table } from "reactstrap";
import { renderPersonalities } from "./Kotodummy.js";
import './Words.css';

class Words extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        word: "",
        personality: "",
        password: "",
      },

      wordList: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/words/');
      const wordList = await res.json();

      this.setState({ wordList });
    } catch (error) {
      console.log(error);
    }
  }

  renderWords = () => {
    const words = this.state.wordList;

    return words.map(w => (
      <tr>
        <td>{w.word}</td>
        <td class = "table-personality">
            {
              w.personality.split(',').map(function (p) {
                return p.trim()
              }).map(
                renderPersonalities
              )
            }
        </td>
        <td>{w.password ? w.password : "-"}</td>
      </tr>
    ));
  };

  render() {
    return (
      <main className = "content">
        <h1 className = "text-black text-uppercase text-center my-4">Words</h1>
        <div className = "row">
          <div className = "col-md-6 col-sm-10 mx-auto p-0">
            <div>
              <Table hover = "true" responsive = "true">
                <thead>
                  <tr>
                    <th>Word</th>
                    <th>Personality</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderWords()}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Words