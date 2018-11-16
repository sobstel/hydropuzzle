import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import shuffle from 'shuffle-array';

import HText from './HText';

/**
 * Decrypting text effect
 *
 * Inspired by https://formidable.com/about/ (hover effect for github)
 */
class HDecryptingText extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func,
    text: PropTypes.string.isRequired
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  delay = 5;
  text = this.props.text.trim();
  charsIndex = []

  state = {
    text: this.text.replace(/[^\s]/g, '*')
  }

  constructor (props) {
    super(props);

    // SMELL: Array.from(Array(this.text.length).keys());
    //        somehow doesn't work on... Android
    for (let i = 0; i < this.text.length; i += 1) {
      this.charsIndex.push(i);
    }
    shuffle(this.charsIndex);
  }

  componentDidMount () {
    if (this.props.completed) {
      this.setState({text: this.text});
      return;
    }

    this.props.setTimeout(this.nextLetter, 1000);
  }

  render () {
    return (
      <HText type='mono' {...this.props}>
        {this.state.text}
      </HText>
    );
  }

  nextLetter = () => {
    const index = this.charsIndex.shift();
    const text = this.state.text.slice(0, index) + this.text[index] + this.state.text.slice(index + 1);

    this.setState({ text });

    if (this.charsIndex.length === 0) {
      this.props.setTimeout(this.props.onEnd, 500);
      return;
    }

    this.props.setTimeout(this.nextLetter, this.delay);
  }
}

export default ReactTimeout(HDecryptingText);
