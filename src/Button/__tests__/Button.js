import React from 'react';
import {shallow, mount, render} from 'enzyme';
import Button from '../Button';

describe('Button', () => {
  it('should render a Button', () => {
    const wrapper = shallow(
      <Button>Some text</Button>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Button with css class mix', () => {
    const wrapper = shallow(
      <Button mix="some-mix">Some text</Button>
    );
    expect(wrapper.find('.some-mix')).toHaveLength(1);
  });

  it('Button should be clickable', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick} />);

    wrapper.find('button').simulate('click', {preventDefault: jest.fn()});

    expect(onClick).toBeCalled();
});
});
