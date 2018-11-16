import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Linking, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import eventEmitterInstance from '@lib/eventEmitterInstance';

import HAvatar from './HAvatar';
import HSocialButton from './HSocialButton';
import HImage from './HImage';
import HText from './HText';

class HTweet extends PureComponent {
  static propTypes = {
    commentsCount: PropTypes.number,
    image: PropTypes.number,
    likesCount: PropTypes.number,
    person: PropTypes.instanceOf(Object).isRequired,
    retweetsCount: PropTypes.number,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  }

  static defaultProps = {
    commentsCount: 0,
    image: null,
    likesCount: 0,
    retweetsCount: 0
  }

  state = {
    liked: false,
    likesCount: this.props.likesCount
  }

  render () {
    return (
      <View style={styles.container}>
        <HAvatar person={this.props.person} style={styles.avatar} />

        <View style={styles.messageContainer}>
          <View style={styles.usernameContainer}>
            <HText style={styles.name}>{this.props.person.name}</HText>
            <HText style={styles.username}>@{this.props.person.name.toLowerCase()}</HText>
            <HText style={styles.time}>· {this.props.time}</HText>
          </View>

          <HText style={styles.text}>{this.props.text}</HText>

          {this.props.image &&
            <HImage
              source={this.props.image}
              style={styles.image} />
          }

          <View style={styles.buttons}>
            {this.renderButtons()}
          </View>
        </View>
      </View>
    );
  }

  renderButtons () {
    const buttons = [
      {
        icon: '&#xf0e5;',
        label: this.props.commentsCount,
        onPress: () => eventEmitterInstance.emit('shareModal')
      },
      {
        icon: '&#xf079;',
        label: this.props.retweetsCount,
        onPress: () => eventEmitterInstance.emit('shareModal')
      },
      {
        icon: this.state.liked ? '&#xf004;' : '&#xf08a;',
        label: this.state.likesCount,
        onPress: () => {
          if (this.state.liked) {
            this.setState({liked: false, likesCount: this.state.likesCount - 1});
          } else {
            this.setState({liked: true, likesCount: this.state.likesCount + 1});
          }
        }
      },
      {
        icon: '&#xf003;',
        label: null,
        onPress: () => eventEmitterInstance.emit('shareModal')
      }
    ];

    return buttons.map((button, i) => <HSocialButton button={button} key={i} />);
  }
}

export default HTweet;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: '1rem'
  },
  avatar: {
    marginRight: '1rem'
  },
  messageContainer: {
    flex: 1
  },
  usernameContainer: {
    flexDirection: 'row'
  },
  name: {
    fontWeight: 'bold',
    color: '#14171a',
    marginRight: '0.3rem'
  },
  username: {
    color: '#657786',
    marginRight: '0.3rem'
  },
  time: {
    color: '#657786'
  },
  text: {
    color: '#14171a'
  },
  image: {
    marginTop: '0.75rem'
  },
  buttons: {
    flexDirection: 'row',
    marginTop: '1rem',
    justifyContent: 'space-between'
  }
});
