import React from 'react';
import GameBoard from '.';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('testing game board with losing end', function()
{
     let parent = shallow(<div></div>);
     let word = "testing";
     let gameOver = sinon.spy();

     let gameBoard = mount(<GameBoard word={word} gameOver={gameOver} parent={parent}/>);
     let keyBoardCapturer = gameBoard.find('#game-kb-catcher');
     let mistakesSpan =  gameBoard.find('#mistakes-holder');
     let lettersDisplay =  gameBoard.find('#letters-display-in');
     let firstLetterDisplay = lettersDisplay.find('div');

     it('it should have 7 display letters', () =>
     {
         expect(lettersDisplay).to.have.exactly(7).descendants('div');
     });

     it('Mistakes div should have one mistake', () =>
     {
        keyBoardCapturer.simulate('keydown', { key: 'A' }); 

        // 1 + container = 2
        expect(mistakesSpan).to.have.exactly(2).descendants('span');     
     });
     
     // simulate another bad letter
     
     it('Mistakes div should have two mistakes', () =>
     {
        keyBoardCapturer.simulate('keydown', { key: 'H' }); 

        // 2 + container = 3
        expect(mistakesSpan).to.have.exactly(3).descendants('span');     
     });

     // simulate duplicate bad letter     
     it('Mistakes div should STILL have two mistakes', () =>
     {
        keyBoardCapturer.simulate('keydown', { key: 'H' }); 

        // 2 + container = 3
        expect(mistakesSpan).to.have.exactly(3).descendants('span');     
     });
    
     // simulate a good letter     
     it('Mistakes div should STILL have two mistakes', () =>
     {
        keyBoardCapturer.simulate('keydown', { key: 'T' }); 
        context('mistakes should increase', () => {
            // 2 + container = 3
            expect(mistakesSpan).to.have.exactly(3).descendants('span');
        });
        context('first display should have the letter T', () => {            
            expect(firstLetterDisplay).to.contain('T');
        });
     });

     //simulate a game over
     it('It should call game over', () =>
     {
        keyBoardCapturer.simulate('keydown', { key: 'D' }); 
         keyBoardCapturer.simulate('keydown', { key: 'K' }); 
                 keyBoardCapturer.simulate('keydown', { key: 'Y' }); 

        keyBoardCapturer.simulate('keydown', { key: 'J' }); 
         keyBoardCapturer.simulate('keydown', { key: 'F' }); 
        keyBoardCapturer.simulate('keydown', { key: 'Z' }); 

        keyBoardCapturer.simulate('keydown', { key: 'P' }); 
         keyBoardCapturer.simulate('keydown', { key: 'Q' }); 
        keyBoardCapturer.simulate('keydown', { key: 'V' }); 

        keyBoardCapturer.simulate('keydown', { key: 'U' }); 

        expect(gameOver).to.have.been.calledWith(parent, false);
     });
});

describe('testing game board with wining end', function()
{
     let parent = shallow(<div></div>);
     let word = "testingwin";
     let gameOver = sinon.spy();

     let gameBoard = mount(<GameBoard word={word} gameOver={gameOver} parent={parent}/>);
     let keyBoardCapturer = gameBoard.find('#game-kb-catcher');
     let mistakesSpan =  gameBoard.find('#mistakes-holder');
     let lettersDisplay =  gameBoard.find('#letters-display-in');
     let firstLetterDisplay = lettersDisplay.find('div');

     it('it should have 10 display letters', () =>
     {
         expect(lettersDisplay).to.have.exactly(10).descendants('div');
     });

     it('Mistakes div should have one mistake', () =>
     {
        keyBoardCapturer.simulate('keydown', { key: 'A' }); 

        // 1 + container = 2
        expect(mistakesSpan).to.have.exactly(2).descendants('span');     
     });
     
     // simulate another bad letter
     
     it('Mistakes div should have two mistakes', () =>
     {
        keyBoardCapturer.simulate('keydown', { key: 'H' }); 

        // 2 + container = 3
        expect(mistakesSpan).to.have.exactly(3).descendants('span');     
     });

     // simulate duplicate bad letter     
     it('Mistakes div should STILL have two mistakes', () =>
     {
        keyBoardCapturer.simulate('keydown', { key: 'H' }); 

        // 2 + container = 3
        expect(mistakesSpan).to.have.exactly(3).descendants('span');     
     });
    
     //simulate a game over
     it('It should call game over with WINNING=TRUE', () =>
     {
        keyBoardCapturer.simulate('keydown', { key: 'T' }); 
        keyBoardCapturer.simulate('keydown', { key: 'E' }); 
        keyBoardCapturer.simulate('keydown', { key: 'S' }); 

        keyBoardCapturer.simulate('keydown', { key: 'I' }); 
        keyBoardCapturer.simulate('keydown', { key: 'N' }); 
        keyBoardCapturer.simulate('keydown', { key: 'G' }); 

        keyBoardCapturer.simulate('keydown', { key: 'W' }); 

        expect(gameOver).to.have.been.calledWith(parent, true);
     });
});