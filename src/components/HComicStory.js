import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';

import HComicHeader from '@components/HComicHeader';
import HImage from '@components/HImage';
import HProgress from '@components/HProgress';

class HComicStory extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    headerText: PropTypes.string,
    headerTimeout: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.number).isRequired,
    onEnd: PropTypes.func,
    timeout: PropTypes.number
  }

  static defaultProps = {
    completed: false,
    headerText: null,
    headerTimeout: 2000,
    onEnd: () => {},
    timeout: 2000
  }

  state = {
    frames: []
  };

  componentDidMount () {
    if (this.props.completed) {
      this.nextFrame();
      return;
    }

    if (this.props.headerText) {
      this.props.setTimeout(() => this.nextFrame(), this.props.headerTimeout);
      return;
    }

    this.nextFrame();
  }

  render () {
    const animationDuration = (this.props.timeout / 2);
    const progressDuration = this.props.timeout - animationDuration;

    return (
      <View style={styles.container}>
        {this.props.headerText && <HComicHeader text={this.props.headerText} />}

        <View style={styles.framesContainer}>
          {this.state.frames.map((frame, i) => {
            return (
              <Animatable.View
                animation={this.props.completed ? '' : 'fadeIn'}
                duration={animationDuration}
                key={i}
                style={styles.frame}>

                <HImage source={frame} />

                {!this.props.completed &&
                  <HProgress
                    duration={progressDuration}
                    onEnd={this.nextFrame} />
                }
              </Animatable.View>
            );
          })}
        </View>
      </View>
    );
  }

  nextFrame = () => {
    if (this.props.completed) {
      this.setState({frames: this.props.images});
      this.props.onEnd();
      return;
    }

    if (this.state.frames.length >= this.props.images.length) {
      this.props.onEnd();
      return;
    }

    this.setState({frames: this.props.images.slice(0, this.state.frames.length + 1)});
  }
}

export default ReactTimeout(HComicStory);

const styles = EStyleSheet.create({
  container: {
    width: rwidth(100),
  },
  framesContainer: {
    marginTop: '1.5rem'
  },
  frame: {
    width: rwidth(100),
    marginBottom: '1rem'
  }
});
