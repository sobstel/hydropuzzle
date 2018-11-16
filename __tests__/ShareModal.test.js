import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

import ShareModal from '@app/ShareModal';

describe('HButton', () => {
  const component = (
    <ShareModal />
  );

  it('renders correctly', () => {
    expect(renderer.create(component)).toMatchSnapshot();
  });
});
