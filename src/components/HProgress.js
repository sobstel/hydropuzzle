import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import * as Progress from 'react-native-progress';
import EStyleSheet from 'react-native-extended-stylesheet';

class HProgress extends PureComponent {
  static propTypes = {
    delay: PropTypes.number,
    duration: PropTypes.number.isRequired,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    delay: 0,
    onEnd: () => {}
  }

  timeout = Math.floor(this.props.duration / 100);

  state = {
    progress: 0
  }

  componentDidMount () {
    this.props.setTimeout(() => this.increment(), this.props.delay);
  }

  render () {
    return (
      <Progress.Bar
        progress={this.state.progress}
        animated
        width={null}
        color='#999'
        style={styles.loader} />
    );
  }

  increment () {
    this.setState({progress: this.state.progress + 0.01});

    if (this.state.progress < 1.05) {
      this.props.setTimeout(() => this.increment(), this.timeout);
    } else {
      this.props.setTimeout(() => this.props.onEnd(), this.timeout);
    }
  }
}

export default ReactTimeout(HProgress);

const styles = EStyleSheet.create({
  loader: {
    height: '0.2rem',
    borderWidth: 0,
    borderRadius: 0
  }
});
