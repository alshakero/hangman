import React, { Component } from 'react';
import TheFolk from '../the-folk';
import BadChoice from './bad_choice.mp3';
import GoodChoice from './good_choice.mp3';
import YouWin from './you_win.mp3';
import YouLose from './you_lose.mp3';

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
    onKeyUp(ev, reactnode)
    {
        let e = ev.nativeEvent;
        if(e.key.match(/[a-z]/i) && e.key.length === 1) // A-Z
        {
            let mistakes = reactnode.state.mistakes;
            let char = e.key.toUpperCase();
            if(reactnode.state.chars.indexOf(char) === -1)
            {   
               this.playAudio(0);
                if(mistakes.indexOf(char) === -1)
                {
                    mistakes.push(char);
                    let mistakesJSX = mistakes.map((el, i) => {return <span key={i}>{el}</span>});
                    reactnode.setState({mistakes, mistakesJSX});                  
                }
                else // already made this mistake?
                {
                   let index = mistakes.indexOf(char);
                   reactnode.state.mistakesJSX[index] = <span key={index} style={{color: '#e888b9'}}>{char}</span>
                   reactnode.setState({mistakesJSX: reactnode.state.mistakesJSX});
                   setTimeout(() => {
                        reactnode.state.mistakesJSX[index] = <span key={index}>{char}</span>
                        reactnode.setState({mistakesJSX: reactnode.state.mistakesJSX});
                   }, 100);
                }
                //check if game is over
                if(mistakes.length > 10)
                {
                    this.playAudio(3);
                    this.gameOver(reactnode.props.parent, false);
                }
            }
            else
            {
               this.playAudio(1);
                let lettersJSX = this.state.lettersJSX;
                for(let i = 0; i < reactnode.state.chars.length; i++)
                {
                    if(reactnode.state.chars[i] === char)
                    {
                        lettersJSX[i] = <div key={i} data-solved={true} className="singleLetter">{char}</div>;
                    }
                }
                let score = lettersJSX.filter((x) => x.props['data-solved']).length;                
                reactnode.setState({lettersJSX}); 

                //check if game has won
                if(score === reactnode.state.chars.length)
                {
                    this.playAudio(2);
                    this.gameOver(reactnode.props.parent, true);
                }
            }
        }
    }
    showKeyBoard()
    {
        try{
            document.getElementById('game-kb-catcher').focus();
        }
        catch(e){}
    }
    render()
    {
        return <div className="game-container" onClick={this.showKeyBoard}>
            <div>
                <TheFolk mistakes={this.state.mistakes.length} style={{float: 'left'}} />
                <div style={{}} className="tried-letters">
                You missed: <br />
                <span>
                    {this.state.mistakesJSX}
                </span>
                </div>
                <div style={{clear: 'both'}}/>
            </div>
                <div className="lettersDisplay">
                 <input id="game-kb-catcher" type="text" tabIndex="0" onKeyDown={(el) => {this.onKeyUp(el, this)}} /> 
                    {this.state.lettersJSX}                
                </div>
                {this.soundPlayers}
        </div>
    }
}

export default GameBoard;