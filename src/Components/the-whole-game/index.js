import React, { Component } from 'react';
import GameBoard from '../game-board';
import './style.css';

class TheWholeGame extends Component
{
    constructor()
    {
        super();
        this.state = {overlayShown: true, word: "", overlayMessage:"Let's play!", overlayMessageButton: "Start"}
        this.loading = false;
    }
    gameOver(comp, won)
    {
        if(won)
            comp.setState({overlayShown: true, overlayMessage:"You win!", overlayMessageButton:"New game"});
        else
            comp.setState({overlayShown: true, overlayMessage:"Game over", overlayMessageButton:"New game"});
    }
    start(comp)
    {
        let length = 8 + Math.floor(4 * Math.random()); // 8 - 12
        if(comp.loading) return;        
        comp.setState({overlayShown: true, overlayMessage:"Fetching a word", overlayMessageButton:"Loading..."});
        fetch(`http://www.setgetgo.com/randomword/get.php?len=${length}`, {mode: 'cors'}).then((resp) =>
        {
           return resp.text();
        }).then((text) => { 
            comp.loading = false;
            comp.setState({word: text, overlayShown: false});
        }).catch((error) =>
        {
            comp.loading = false;
            comp.setState({overlayShown: true, overlayMessage:"Couldn't fetch a word", overlayMessageButton:"Try again"});
        });
    }
    render()
    {
        return <div>
                    {this.state.overlayShown ? 
                    <div className="overlay">
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