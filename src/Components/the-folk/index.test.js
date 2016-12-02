import React from 'react';
import TheFolk from '.';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('testing the folk', function()
{
    let theFolk;
    let mistakes = 0;
    
    beforeEach(() =>
    {
        theFolk = shallow(<TheFolk mistakes={mistakes}/>);
    });

    context('Testing after every mistake', () =>
    {
        for(let i = 12; i > 9; i--)
        {
            it(`It should have ${i} hidden elements`, () => {
                expect(theFolk).to.have.exactly(i).descendants('.hidden');
                mistakes++;
            });
        }
        // hip and torso are both attached to one mistake (two hidden elements one mistake), causing an offset
        for(let i = 9; i > 1; i--)
        {
            it(`It should have ${i} hidden elements`, () => {
                expect(theFolk).to.have.exactly(i-1).descendants('.hidden');
                mistakes++;
            });
        }
    });
});