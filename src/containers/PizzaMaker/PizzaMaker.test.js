import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PizzaMaker } from './PizzaMaker';
import PizzaControls from '../../components/Pizza/PizzaControls/PizzaControls';
import Pizza from '../../components/Pizza/Pizza';

configure({
    adapter: new Adapter()
})

describe('<PizzaMaker />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<PizzaMaker initIngredients={() => {}} buyPizzaPurchasing={() => {}} purchaseInit={() => {}} />)
    })

    it('should render Pizza Controls when getting ingredients passed in', () => {
        wrapper.setProps({
            ingredients: [{
                type: 'olive',
                purchased: false
            }]
        })
        expect(wrapper.find(PizzaControls)).toHaveLength(1);
    })

    it('should render the Pizza itself with ingredients loaded in', () => {
        wrapper.setProps({
            ingredients: []
        })
        expect(wrapper.find(Pizza)).toHaveLength(1);
    })
});