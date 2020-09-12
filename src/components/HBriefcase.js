import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';

import HDecryptingText from './HDecryptingText';
import HTrigger from './HTrigger';

class HBriefcase extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    headerText: PropTypes.string.isRequired,
    onEnd: PropTypes.func,
    onLastRecord: PropTypes.func,
    onPlayerComment: PropTypes.func,
    onRecord: PropTypes.func,
    records: PropTypes.arrayOf(PropTypes.node).isRequired
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {},
    onLastRecord: () => {},
    onPlayerComment: () => {},
    onRecord: () => {}
  }

  animationDuration = 800;

  state = {
    triggerIndex: 0,
    recordIndex: 0
  }

  componentDidMount () {
    if (this.props.completed) {
      this.setState({recordIndex: this.props.records.length});
    }
  }

  render () {
    return (
      <Animatable.View animation={this.props.completed ? '' : 'flipInX'} style={styles.container}>
        <HDecryptingText
          text={this.props.headerText}
          onEnd={this.nextTrigger}
          style={styles.header}
          completed={this.props.completed} />

        {this.props.records.map((record, i) => {
          return (
            <View key={i}>
              {this.state.triggerIndex > i &&
                <HTrigger
                  name='plus'
                  appearance='dark'
                  scale={0.9}
                  onPress={this.nextRecord}
                  style={styles.trigger}
                  disabled={this.props.completed} />
              }

              {this.state.recordIndex > i &&
                <Animatable.View
                  animation={this.props.completed ? '' : 'zoomInUp'}
                  duration={this.animationDuration}
                  key={i}
                  onAnimationEnd={this.nextTrigger}
                  style={styles.recordContainer}>

                  {record}
                </Animatable.View>
              }
            </View>
          );
        })}
      </Animatable.View>
    );
  }

  nextTrigger = () => {
    if (this.state.triggerIndex === this.props.records.length) {
      this.props.onEnd();
      return;
    }

    this.setState({triggerIndex: this.state.triggerIndex + 1});
  }

  nextRecord = () => {
    this.setState({recordIndex: this.state.recordIndex + 1});

    this.props.onRecord(this.state.recordIndex);

    if (this.state.recordIndex === this.props.records.length - 1) {
      this.props.onLastRecord();
    }
  }
}

export default ReactTimeout(HBriefcase);

const styles = EStyleSheet.create({
  container: {
    width: rwidth(100),
    backgroundColor: '#fff9',
    paddingVertical: '0.5rem',
    // don't use "rem" for borders, otherwise weird background appears
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderColor: '#7664'
  },
  header: {
    marginVertical: '1rem',
    marginHorizontal: '1rem'
  },
  recordContainer: {
    marginVertical: '1rem',
    borderColor: '#7662',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    backgroundColor: '#fff6'
  },
  trigger: {
    marginVertical: '0rem'
  }
});
