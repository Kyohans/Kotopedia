import React, { Component, useState } from "react";
import { Tooltip} from "reactstrap";
import '../App.css';

export default class Landing extends Component {
  render() {
    return (
      <>
        <div class = "landing-container">
          <p class = "landing-text-logo">Kotopedia</p>
          <div class = "landing-links">
            <a href = "/kotodummies">Kotodummies</a>
            <a href = "/words">Words</a>
          </div>
        </div>
      </>
    )
  }
}

export const About = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const showTooltip = () => setTooltipOpen(!tooltipOpen);
  const toggleTooltip = () => setCopied(!copied);

  return (
    <>
      <div class = "about-container">
        <div class = "about-page">
          <h1 style = {{ fontSize: "40px", marginBottom: "2rem" }}>Welcome to Kotopedia!</h1>
          <p style = {{ fontSize: "20px" }}>
            Kotopedia is an encyclopedia for Kotodama Diary made by <a class = "about-links" href = "https://github.com/Kyohans">Kyohan</a>.
            Huge thanks to <a class = "about-links" href = "https://www.reddit.com/user/stone_coldfoxx/">u/stone_coldfoxx</a> and <a class = "about-links" href = "https://www.reddit.com/user/dearestmina">u/dearestmina</a> from the <a class = "about-links" href = "https://www.reddit.com/r/KotoDamaDiary/">r/KotoDamaDiary</a> community for the spreadsheet of kotodummies and words!
            Without them and the community's help in contributing to the sheet, this website would not have been made. Although, there is still a lot of missing words and kotodummies to add here.
            If you have anything you'd like to add or correct, shoot me a message on 
            <span id = "discord-link" onClick = {() => {
              navigator.clipboard.writeText('Kyohan#6342');
              toggleTooltip();
            }}> Discord </span>
            or <a class = "about-links" href = "https://twitter.com/ky0h4n">Twitter</a>!

            <Tooltip placement = 'bottom' isOpen = {tooltipOpen} target = 'discord-link' toggle = {showTooltip}>
              { copied ? "Copied to clipboard!" : "Kyohan#6342" }
            </Tooltip>
          </p>
        </div>
      </div>
    </>
  )
}
