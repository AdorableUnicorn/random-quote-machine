import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import videoWaves from './waves.mp4';
import {TwitterIcon } from 'react-share';


const key="TWuPpvQvSgLcypIe9ErdHw==93ivnWUXHJ5qpAKG"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      quote_author: ''
    };
  }

  async getQuote(category="") {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes?category="+category, {
      method: "GET",
      headers: {
        "X-Api-Key": key
        }
      })
    const jsonData = await response.json()
    console.log("random quote: ",jsonData[0]["quote"], "author", jsonData[0]["author"])
    this.setState({
      quote: jsonData[0]["quote"],
      quote_author: jsonData[0]["author"]
    });
    console.log(this.state.quote)
  }
  
  componentDidMount() {
    this.getQuote();
    console.log(this.state.quote)
  }

  

  render() {
    return (
      <div className="main">
        <video id="myVideo"src={videoWaves} autoPlay muted loop/>
        <div id="quote-box">
          
          <p id="text" className="overlay">{this.state.quote}</p>
          <p id="author"><i>{this.state.quote_author}</i></p>
          <div id="btn_box">
            <button onClick={() => this.getQuote()} id="new-quote" className="btn" >Get a Quote</button>
            <a
              id="tweet-quote"
              className="twitter-share-button"
              data-size="large"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.state.quote)}`}><TwitterIcon id='icon' className="btn" /></a>
          </div>
        </div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);