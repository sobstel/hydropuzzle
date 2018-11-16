import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rheight } from '@lib/rsize';

import HText from '@components/HText';

class HProgressText extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    endText: PropTypes.string.isRequired,
    loadText: PropTypes.string,
    onEnd: PropTypes.func,
    onStart: PropTypes.func,
    width: PropTypes.number.isRequired
  }

  static defaultProps = {
    completed: false,
    loadText: null,
    onEnd: () => {},
    onStart: () => {}
  }

  state = {
    load: false,
    end: false,
    progress: 0
  }

  progressInterval = null;

  componentDidMount () {
    this.props.onStart();
    if (this.props.completed) {
      this.props.onEnd();
    } else {
      this.start();
    }
  }

  render () {
    return (
      <View>
        {!this.props.completed && this.state.load &&
          <Animatable.View animation='bounceIn' duration={750}>
            <Progress.Bar
              progress={this.state.progress}
              animated
              width={this.props.width}
              height={rheight(1.5)}
              color='#666' />

            {this.props.loadText &&
              <HText style={styles.loadText}>
                {this.props.loadText}
              </HText>
            }
          </Animatable.View>
        }

        {!this.props.completed && this.state.end &&
          <Animatable.View animation='bounceIn' duration={750} onAnimationEnd={this.props.onEnd}>
            <HText style={styles.endText}>
              {this.props.endText}
            </HText>
          </Animatable.View>
        }

        {this.props.completed &&
          <HText style={styles.endText}>
            {this.props.endText}
          </HText>
        }
      </View>
    );
  }

  start () {
    this.setState({load: true, progress: 0});

    this.progressInterval = this.props.setInterval(() => {
      this.setState({progress: this.state.progress + Math.random() / 24});

      // progress bar finished?
      if (this.state.progress > 1) {
        this.props.clearInterval(this.progressInterval);

        this.setState({load: false, end: true});
      }
    }, 75);
  }
}

export default ReactTimeout(HProgressText);

const styles = EStyleSheet.create({
  loadText: {
    marginTop: '0.4rem',
    marginLeft: '0.1rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333'
  },
  endText: {
    fontSize: '1rem',
    fontWeight: '600'
  }
});
