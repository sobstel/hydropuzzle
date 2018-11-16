import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import HButton from '@components/HButton';

describe('HButton', () => {
  const component = (
    <HButton name='mail' />
  );

  it('renders correctly', () => {
    expect(renderer.create(component)).toMatchSnapshot();
  });
});
