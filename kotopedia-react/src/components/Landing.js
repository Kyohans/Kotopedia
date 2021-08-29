import React, { Component } from "react";
import '../App.css';

export default class Landing extends Component {
  render() {
    return (
      <main className = "content">
        <div id = "landing-container">
          <p class = "landing-text-logo">Kotopedia</p>
          <div class = "landing-links">
            <a href = "/kotodummies">Kotodummies</a>
            <a href = "/words">Words</a>
            <a href = "/">Contribute</a>
          </div>
        </div>
      </main>
    )
  }
}