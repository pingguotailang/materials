import React from 'react';
import { shallow } from 'enzyme';
import SchulteGrid from '../src/index';
import '../src/main.scss';

it('renders', () => {
  const wrapper = shallow(<SchulteGrid />);
  expect(wrapper.find('.SchulteGrid').length).toBe(1);
});
