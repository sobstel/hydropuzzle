import React from 'react';
import { shallow } from 'enzyme';

import HText from '@components/HText';

const text = 'Some text';

describe('HText', () => {
  const component = (<HText>{text}</HText>);

  it('renders correctly', () => {
    expect(shallow(component)).toMatchSnapshot();
  });

  it('contains text', () => {
    expect(shallow(component).contains(text)).toBe(true);
  });
});
