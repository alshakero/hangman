import React, { Component } from 'react';
import GameBoard from '../game-board';
import './style.css';
import 'whatwg-fetch';

class TheWholeGame extends Component
{
    constructor()
    {
        super();
        this.state = {overlayShown: true, word: "empty", overlayMessage:"Let's play!", overlayMessageButton: "Start"}
        this.loading = false;
    }
    gameOver(comp, won)
    {
        window.scrollTo(0, 0);
        if(won)
            comp.setState({overlayShown: true, overlayMessage:"You win!", overlayMessageButton:"New game"});
        else
            comp.setState({overlayShown: true, overlayMessage:"Game over", overlayMessageButton:"New game"});
    }
    encapsuledFetch(url, ok , error)
    {
        fetch(url, {mode: 'cors'}).then((resp) =>
        {
           return resp.text();
        }).then(ok).catch(error);
    }
    start(comp)
    {
        if(comp.loading) return;        
        comp.setState({overlayShown: true, overlayMessage:"Fetching a word", overlayMessageButton:"Loading..."});
        this.encapsuledFetch("https://www.omaralshaker.com:443/word.php", 
        (text) => { 
            comp.loading = false;
            comp.setState({word: text, overlayShown: false});
        }, 
        (error) =>
        {
            comp.loading = false;
            comp.setState({overlayShown: true, overlayMessage:"Couldn't fetch a word", overlayMessageButton:"Try again"});
        });
        
    }
    render()
    {
        this.encapsuledFetch = this.props.fetch ? this.props.fetch : this.encapsuledFetch;
        return <div>
                    {this.state.overlayShown ? 
                    <div id="overlay">
                        <div className="centerized">
                            <h1>{this.state.overlayMessage}</h1>
                            {this.state.overlayMessage === "You win!" ? <p>It's <em>{this.state.word}</em></p> : ""}
                            <a onClick={() => this.start(this)}>{this.state.overlayMessageButton}</a>
                        </div>
                    </div>
                    : ""}
                    <GameBoard word={this.state.word} gameOver={this.gameOver} parent={this}/>
                </div>
    }
}
export default TheWholeGame;