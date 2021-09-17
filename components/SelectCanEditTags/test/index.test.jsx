import React from 'react';
import { shallow } from 'enzyme';
import SelectCanEditTags from '../src/index';
import '../src/main.scss';

it('renders', () => {
  const wrapper = shallow(<SelectCanEditTags />);
  expect(wrapper.find('.SelectCanEditTags').length).toBe(1);
});
