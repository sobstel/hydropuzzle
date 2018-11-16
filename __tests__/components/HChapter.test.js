import React from 'react';
import { shallow } from 'enzyme';

import HChapter from '@components/HChapter';

import chapter1Images from '@images/chapter1';

describe('HChapter', () => {
  const component = (<HChapter showTitleBanner upperTitle='UTitle' lowerTitle='LTitle' titleImage={chapter1Images.title} />);

  it('renders correctly', () => {
    expect(shallow(component)).toMatchSnapshot();
  });
});
