import React from 'react';
import { shallow } from 'enzyme';
import Piano from '../src/index';
import '../src/main.scss';

it('renders', () => {
  const wrapper = shallow(<Piano />);
  expect(wrapper.find('.Piano').length).toBe(1);
});
