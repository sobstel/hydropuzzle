import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import eventEmitterInstance from '@lib/eventEmitterInstance';

import HAvatar from './HAvatar';
import HSocialButton from './HSocialButton';
import HText from './HText';

class HFBPost extends PureComponent {
  static propTypes = {
    likesCount: PropTypes.number,
    location: PropTypes.string.isRequired,
    person: PropTypes.instanceOf(Object).isRequired,
    sharesCount: PropTypes.number,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  }

  static defaultProps = {
    likesCount: 0,
    sharesCount: 0
  }

  state = {
    liked: false
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HAvatar person={this.props.person} style={styles.avatar} />

          <View>
            <HText style={styles.name}>{this.props.person.name}</HText>
            <HText style={styles.generalInfo}>{this.props.time} · {this.props.location}</HText>
          </View>
        </View>

        <HText style={styles.message}>
          {this.props.text}
        </HText>

        <View style={styles.socialInfo}>
          <View style={styles.likeContainer}>
            <View style={styles.likeIconContainer}>
              <HText style={styles.likeIcon}>&#xf164;</HText>
            </View>
            <HText style={styles.likeText}>
              {this.state.liked ? `You and ${this.props.likesCount} others` : this.props.likesCount}
            </HText>
          </View>
          <HText style={styles.shareText}>{this.props.sharesCount} shares</HText>
        </View>

        <View style={styles.buttons}>
          {this.renderButtons()}
        </View>
      </View>
    );
  }

  renderButtons () {
    const buttons = [
      {
        icon: this.state.liked ? '&#xf164;' : '&#xf087;',
        label: 'Like',
        onPress: () => {
          this.setState({liked: !this.state.liked});
        }
      },
      {
        icon: '&#xf045;',
        label: 'Share',
        onPress: () => eventEmitterInstance.emit('shareModal')
      }
    ];

    return buttons.map((button, i) => <HSocialButton button={button} key={i} />);
  }
}

export default HFBPost;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: '1rem'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginRight: '1rem'
  },
  name: {
    color: '#111',
    fontWeight: 'bold'
  },
  generalInfo: {
    color: '#90949c',
    fontSize: '0.9rem'
  },
  message: {
    marginTop: '1rem',
    marginBottom: '0.75rem'
  },
  socialInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  likeContainer: {
    flexDirection: 'row'
  },
  likeIconContainer: {
    backgroundColor: '#5890ff',
    width: '1.4rem',
    height: '1.4rem',
    borderRadius: '0.7rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.3rem'
  },
  likeIcon: {
    fontFamily: '$iconFont',
    fontSize: '0.75rem',
    color: '#fff'
  },
  likeText: {
    fontSize: '0.9rem',
    color: '#898f9c'
  },
  shareText: {
    fontSize: '0.9rem',
    color: '#898f9c'
  },
  buttons: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTopWidth: 1,
    borderColor: '#ccc3',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
