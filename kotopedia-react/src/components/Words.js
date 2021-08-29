import React, { Component } from "react";
import { Table } from "reactstrap";
import { renderPersonalities } from "../App.js";
import { Search } from "../App.js";
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

      query: "",
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

  renderWords = (query) => {
    const words = query === "" ? this.state.wordList 
                                : this.state.wordList.filter(w => (
                                  w.word.toLowerCase().includes(query)
                                ));

    return words.map(w => (
      <tr class = "word-listing">
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

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <main className = "content">
        <Search placeholder = "Search words..." value = {this.state.query} onChange = {this.inputHandler}/>
        <div className = "row">
          <div className = "col-md-6 col-sm-10 mx-auto p-4">
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
                  {this.renderWords(this.state.query)}
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