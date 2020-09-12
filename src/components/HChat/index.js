import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import TypingIndicator from './TypingIndicator';
import { rwidth } from '@lib/rsize';

import HAvatar from '@components/HAvatar';
import HImage from '@components/HImage';
import HText from '@components/HText';

import icons from '@images/icons';

class HChat extends PureComponent {
  static propTypes = {
    baseMs: PropTypes.number,
    completed: PropTypes.bool,
    memes: PropTypes.instanceOf(Object),
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEnd: PropTypes.func,
    onStart: PropTypes.func,
    people: PropTypes.instanceOf(Object),
    title: PropTypes.string
  }

  static defaultProps = {
    baseMs: 120,
    completed: false,
    memes: {},
    people: [],
    onEnd: () => {},
    onStart: () => {},
    title: '#chat'
  }

  messageIndex = 0;
  maxMessageLength = this.props.messages.reduce((maxVal, message) => {
    return (message.text ? Math.max(maxVal, message.text.length) : maxVal);
  }, 0);

  state = {
    typingIndicator: false,
    messages: []
  }

  componentDidMount () {
    this.props.onStart();
    this.nextMessage();
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <HText style={styles.title}>{this.props.title}</HText>
        </View>

        <View style={styles.messagesContainer}>
          {this.renderMessages()}

          {this.state.typingIndicator && <TypingIndicator />}
        </View>
      </View>
    );
  }

  renderMessages () {
    return this.state.messages.map((message, i) => {
      const person = this.props.people[message.person];

      return (
        <Animatable.View
          key={i}
          animation={this.props.completed ? '' : 'fadeIn'}
          duration={800}
          style={styles.message}>

          <View style={styles.leftContainer}>
            {person.avatar && <HAvatar person={person} />}
          </View>

          <View style={styles.rightContainer}>
            <HText style={styles.name}>
              {person.name || 'unknown'}
            </HText>
            <View style={styles.textContainer}>
              {message.text &&
                <HText>
                  {message.text}
                </HText>
              }
              {message.thumb &&
                <Image
                  source={icons.thumbsUp}
                  style={styles.thumb} />
              }
              {message.meme &&
                <HImage
                  source={this.props.memes[message.meme]}
                  containerStyle={styles.meme} />
              }
            </View>
          </View>
        </Animatable.View>
      );
    });
  }

  nextMessage () {
    if (this.props.completed) {
      this.setState({messages: this.props.messages});
      this.props.onEnd();
      return;
    }

    this.setState({
      typingIndicator: false,
      messages: this.props.messages.slice(0, this.messageIndex + 1)
    });

    this.messageIndex += 1;

    if (this.messageIndex >= this.props.messages.length) {
      this.props.onEnd();
      return;
    }

    const baseMs = this.props.baseMs;

    const currentText = this.props.messages[this.messageIndex - 1].text;
    const nextText = this.props.messages[this.messageIndex].text;
    let nextMessageDelay;

    // delay before next message
    // (uses current message length to give enough time to read it before next one appears)
    if (currentText) {
      nextMessageDelay = baseMs * currentText.length;
      // normalize min/max
      nextMessageDelay = Math.min(Math.max(nextMessageDelay, baseMs * 15), baseMs * 50);
    } else {
      nextMessageDelay = baseMs * 10;
    }

    this.props.setTimeout(() => this.nextMessage(), nextMessageDelay);

    // typing indicator before next message
    const typingIndicatorDelay = nextText
      ? Math.min(nextMessageDelay * (1 - nextText.length / this.maxMessageLength), 1000)
      : 1000;

    this.props.setTimeout(() => this.setState({typingIndicator: true}), typingIndicatorDelay);
  }
}

export default ReactTimeout(HChat);

const styles = EStyleSheet.create({
  container: {
    width: rwidth(100),
    backgroundColor: '#fff9'
  },
  titleContainer: {
    // width: rwidth(100),
    backgroundColor: '#fffa',
    paddingVertical: '0.75rem'
  },
  title: {
    fontWeight: 'bold',
    marginLeft: '1rem',
    color: '#333'
  },
  messagesContainer: {
    paddingVertical: '1rem'
  },
  message: {
    flexDirection: 'row',
    marginVertical: '0.5rem'
  },
  leftContainer: {
    marginLeft: '1rem'
  },
  rightContainer: {
    paddingRight: '1rem',
    marginLeft: '1rem',
    flexDirection: 'column'
  },
  name: {
    fontSize: '0.95rem',
    color: '#999',
    paddingLeft: '0.75rem',
    marginBottom: '0.1rem'
  },
  textContainer: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: '0.7rem',
    paddingVertical: '0.5rem',
    borderRadius: '0.5rem',
    maxWidth: '100% - 6.5rem'
  },
  thumb: {
    width: '2.25rem',
    height: '2.25rem'
  },
  meme: {
    paddingVertical: '0.7rem',
    minWidth: '11rem',
    maxWidth: '100% - 9rem'
  }
});
