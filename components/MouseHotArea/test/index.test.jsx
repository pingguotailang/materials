import React from 'react';
import { shallow } from 'enzyme';
import MouseHotArea from '../src/index';
import '../src/main.scss';

it('renders', () => {
  const wrapper = shallow(<MouseHotArea />);
  expect(wrapper.find('.MouseHotArea').length).toBe(1);
});
