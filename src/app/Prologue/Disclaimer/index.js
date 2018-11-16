import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { _ } from '@app/script';

import Paragraph from './Paragraph';

import config from '@src/config';

const DELAY = config['prologue.delay'];

class Disclaimer extends Component {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    paragraphsVisibility: [false, false, false]
  };

  paragraphsTexts = _('prologue.disclaimer.paragraphs');

  componentDidMount () {
    this.props.setTimeout(() => this.nextParagraph(), DELAY / 2);
  }

  render () {
    return (
      <View style={styles.container}>
        {this.paragraphsTexts.map((text, key) => {
          if (this.state.paragraphsVisibility[key]) {
            return <Paragraph text={text} key={key} onTypingEnd={this.nextParagraph} completed={this.props.completed} />;
          }
          return null;
        })}
      </View>
    );
  }

  nextParagraph = () => {
    const paragraphsVisibility = this.state.paragraphsVisibility;
    const index = paragraphsVisibility.findIndex((el) => el === false);

    if (index === -1) {
      this.props.setTimeout(() => this.props.onEnd(), DELAY);
      return;
    }

    paragraphsVisibility[index] = true;

    this.props.setTimeout(() => this.setState({paragraphsVisibility: paragraphsVisibility}), DELAY);
  }
}

export default ReactTimeout(Disclaimer);

const styles = EStyleSheet.create({
  container: {
    paddingTop: '10%',
    paddingBottom: '8%',
    minHeight: '12%',
    flexGrow: 1
  }
});
