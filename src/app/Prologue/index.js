import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth, rheight } from '@lib/rsize';

import HTrigger from '@components/HTrigger';
import Disclaimer from './Disclaimer';
import Background from './Background';

import config from '@src/config';

class Prologue extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    ...config.initialState.prologue
  }

  componentDidMount () {
    if (this.props.completed) {
      this.setState({
        disclaimer: true,
        chapterTrigger: true
      });
    }
  }

  render () {
    return (
      <Animatable.View
        animation='fadeIn'
        style={styles.container}>

        <Background />

        {this.state.disclaimer &&
          <Disclaimer
            completed={this.props.completed}
            onEnd={this.onDisclaimerEnd} />
        }

        {this.state.chapterTrigger &&
          <HTrigger
            name='nextChapter'
            onPress={this.props.onEnd}
            style={styles.chapterTrigger} />
        }
      </Animatable.View>
    );
  }

  onDisclaimerEnd = () => this.setState({chapterTrigger: true});
}

export default Prologue;

const styles = EStyleSheet.create({
  container: {
    width: rwidth(100),
    height: rheight(100)
  },
  chapterTrigger: {
    marginVertical: '1rem'
  }
});
