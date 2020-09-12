import React, { PureComponent } from 'react';
import { LayoutAnimation, Platform, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import TypeWriter from 'react-native-typewriter';

import config from '@src/config';

class Paragraph extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool
  }

  static defaultProps = {
    completed: false
  }

  minDelay = config['prologue.paragraph.minDelay'];
  maxDelay = config['prologue.paragraph.maxDelay'];

  UNSAFE_componentWillMount () {
    LayoutAnimation.spring();
  }

  componentDidMount () {
    if (this.props.completed) {
      this.props.onTypingEnd();
    }
    if (Platform.OS === 'android') {
      this.props.onTypingEnd();
    }
  }

  render () {
    const { text } = this.props;
    const completed = this.props.completed || Platform.OS === 'android';

    return (
      <View style={styles.container}>
        {!completed &&
          <TypeWriter
            typing={1}
            minDelay={this.minDelay}
            maxDelay={this.maxDelay}
            fixed
            style={styles.text}
            {...this.props}>
            {text}
          </TypeWriter>
        }
        {completed &&
          <Text style={styles.text}>
            {text}
          </Text>
        }
      </View>
    );
  }
}

export default Paragraph;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: '7%',
    marginVertical: '2.5%'
  },
  text: {
    fontFamily: '$comicHeaderFont',
    fontSize: '1.1rem',
    color: '#111'
  }
});
