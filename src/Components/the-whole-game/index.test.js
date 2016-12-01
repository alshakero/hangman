import React from 'react';
import TheWholeGame from '.';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('Testing overlay', () =>
{
    let theWholeGame;
    let overLay;

    beforeEach(() =>
    {
         theWholeGame = shallow(<TheWholeGame />);
         overLay = theWholeGame.find('#overlay');
    })
    it('should have the overlay shown', ()=>
    {
        expect(overLay).to.exist;
    });    
    it('clicking the start button should remove the overlay', ()=>
    {
        let botton = overLay.find('a');
        overLay = theWholeGame.find('#overlay');        
        
        expect(overLay).to.exist;

        botton.simulate('click'); 

        overLay = theWholeGame.find('#overlay');

        expect(overLay).to.exist;        
    });
})
describe('Testing the ajax request', () =>
{
    let theWholeGame;
    let overLay;
    
    let fetchSpy = sinon.stub();

    beforeEach(() =>
    {        
        theWholeGame = mount(<TheWholeGame fetch={fetchSpy} />);
        overLay = theWholeGame.find('#overlay');
    });

    it('clicking the start call fetch', ()=>
    {
        let botton = overLay.find('a');          
        botton.simulate('click');
        expect(fetchSpy).to.have.been.calledWithMatch(sinon.match.string, sinon.match.func, sinon.match.func);
    });
})