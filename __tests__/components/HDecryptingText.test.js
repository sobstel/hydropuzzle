import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

import HDecryptingText from '@components/HDecryptingText';

const text = 'Encrypted text!';

describe('HDecryptingText', () => {
  const onEnd = jest.fn();
  const component = (
    <HDecryptingText
      text={text}
      onEnd={onEnd} />
  );

  it('renders correctly', () => {
    const wrapper = renderer.create(component);

    jest.runAllTimers();

    expect(wrapper).toMatchSnapshot();
    expect(onEnd).toBeCalled();
  });
});
