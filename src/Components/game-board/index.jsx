import React, { Component } from 'react';
import TheFolk from '../the-folk';
import BadChoice from './sounds/bad_choice.wav';
import GoodChoice from './sounds/good_choice.wav';
import YouWin from './sounds/you_win.wav';
import YouLose from './sounds/you_lose.wav';

import './general.css';

class GameBoard extends Component
{
    init(props, construct)
    {
        let lettersJSX = [];
        let mistakes = [];
        let mistakesJSX = [];
        let chars = props.word.toUpperCase().split('');
        // split word
        chars.forEach((el, i) => {
            lettersJSX.push(<div key={i} className="singleLetter">&nbsp;</div>);
        });
        if(construct)
        {   
            this.gameOver = props.gameOver;
            this.state = {chars, lettersJSX, mistakes, mistakesJSX};

            // some sound effects
            this.playeableSoundPlayers = [
                new Audio(BadChoice),
                new Audio(GoodChoice),
                new Audio(YouWin),
                new Audio(YouLose)            
            ];
            this.keyBoardButtons = [];
            for(let i = 65; i < 91; i++)
            {
                this.keyBoardButtons.push(<span key={i} onClick={() => {this.recordChar(String.fromCharCode(i), this)}} className="kb-btn">{String.fromCharCode(i)}</span>);
            }
        }
        else this.setState({chars, lettersJSX, mistakes, mistakesJSX});
        this.score = 0;        
    }
    playAudio(index)
    {
        if(this.playeableSoundPlayers[index])
        {
            this.playeableSoundPlayers[index].play();
        }
    }
    constructor(props)
    {
        super(props);
        this.init(props, true);
    }
    componentWillReceiveProps(props)
    {
        this.init(props);
        //to capture keyboard events
        try
        {
            document.getElementById('game-kb-catcher').focus();
        }
        catch(e){}
    }
    recordChar(char, comp)
    {
        let mistakes = comp.state.mistakes;
        if(comp.state.chars.indexOf(char) === -1)
        {   
            this.playAudio(0);
            if(mistakes.indexOf(char) === -1)
            {
                mistakes.push(char);
                let mistakesJSX = mistakes.map((el, i) => {return <span key={i}>{el}</span>});
                comp.setState({mistakes, mistakesJSX});                  
            }
            else // already made this mistake?
            {
                let index = mistakes.indexOf(char);
                comp.state.mistakesJSX[index] = <span key={index} style={{color: '#e888b9'}}>{char}</span>
                comp.setState({mistakesJSX: comp.state.mistakesJSX});
                setTimeout(() => {
                    comp.state.mistakesJSX[index] = <span key={index}>{char}</span>
                    comp.setState({mistakesJSX: comp.state.mistakesJSX});
                }, 300);
            }
            //check if game is over
            if(mistakes.length > 10)
            {
                this.playAudio(3);
                this.gameOver(comp.props.parent, false);
            }
        }
        else
        {
            this.playAudio(1);
            let lettersJSX = this.state.lettersJSX;
            for(let i = 0; i < comp.state.chars.length; i++)
            {
                if(comp.state.chars[i] === char)
                {
                    lettersJSX[i] = <div key={i} data-solved={true} className="singleLetter">{char}</div>;
                }
            }
            let score = lettersJSX.filter((x) => x.props['data-solved']).length;                
            comp.setState({lettersJSX}); 

            //check if game has won
            if(score === comp.state.chars.length)
            {
                this.playAudio(2);
                this.gameOver(comp.props.parent, true);
            }
        }
    }
    onKeyUp(ev)
    {        
        let char = ("" + ev.key).toUpperCase(); 
        if(char.match(/[a-z]/i) && char.length === 1) // A-Z and not shift, alt etc..
        {           
            this.recordChar(char, this);
        }
    }
    render()
    {
        return <div id="game-kb-catcher" className="game-container" tabIndex="0" onKeyDown={(ev) => {this.onKeyUp(ev)}}>
            <div>
                <TheFolk mistakes={this.state.mistakes.length} style={{float: 'left'}} />
                <div style={{}} className="tried-letters">
                You missed: <br />
                <span id="mistakes-holder">
                    {this.state.mistakesJSX}
                </span>
                </div>
                <div style={{clear: 'both'}}/>
            </div>
                <div className="lettersDisplay">
                    <div className="mobile-keyboard">
                        <p>Keyboard</p>
                        {this.keyBoardButtons}
                    </div>
                    <span id="letters-display-in">
                        {this.state.lettersJSX}       
                    </span>         
                </div>
                {this.soundPlayers}
        </div>
    }
}

export default GameBoard;