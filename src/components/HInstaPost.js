import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import { rwidth } from '@lib/rsize';
import eventEmitterInstance from '@lib/eventEmitterInstance';

import HAvatar from './HAvatar';
import HImage from './HImage';
import HSocialButton from './HSocialButton';
import HText from './HText';
import HTrigger from './HTrigger';

import people from '@app/people';

class HInstaPost extends PureComponent {
  static propTypes = {
    commentable: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.object),
    image: PropTypes.number,
    likedBy: PropTypes.string,
    likesCount: PropTypes.number,
    location: PropTypes.string,
    onPlayerComment: PropTypes.func,
    person: PropTypes.instanceOf(Object).isRequired,
    time: PropTypes.string.isRequired,
    video: PropTypes.number,
    videoPreview: PropTypes.number
  }

  static defaultProps = {
    commentable: false,
    comments: [],
    image: null,
    likedBy: null,
    likesCount: 0,
    location: null,
    onPlayerComment: () => {},
    video: null,
    videoPreview: null
  }

  textInputAttention = null;
  videoPlayer = null;

  state = {
    likesCount: this.props.likesCount,
    userComment: null,
    videoPaused: true,
    videoProgress: 0
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HAvatar person={this.props.person} style={styles.avatar} />
          <View>
            <HText style={styles.name}>{this.props.person.name}</HText>
            {this.props.location && <HText style={styles.location}>{this.props.location}</HText>}
          </View>
        </View>

        <View style={styles.mediaContainer}>
          {this.props.image &&
            <HImage
              source={this.props.image}
              style={styles.image} />
          }
          {this.props.video && this.state.videoPaused &&
            <View>
              <View style={styles.videoPreviewContainer}>
                {this.props.videoPreview &&
                  <HImage
                    source={this.props.videoPreview}
                    containerStyle={styles.videoPreview} />
                }

                <HTrigger
                  name='play'
                  onPress={this.onVideoTriggerPress}
                  styles={styles.videoTrigger} />
              </View>
              <View style={styles.videoProgress} />
            </View>
          }
          {this.props.video && !this.state.videoPaused &&
            <View>
              <Video
                source={this.props.video}
                muted
                controls={false}
                paused={this.state.videoPaused}
                repeat={false}
                rate={1.0}
                style={styles.video}
                resizeMode='contain'
                onProgress={this.onVideoProgress}
                onEnd={this.onVideoEnd} />

              <Progress.Bar
                progress={this.state.videoProgress}
                animated
                width={null}
                color='#999'
                style={styles.videoProgress} />
            </View>
          }
        </View>

        <View style={styles.buttons}>
          {this.renderButtons()}
        </View>

        {this.props.likedBy &&
          <HText style={styles.likes}>
            Liked by <HText style={styles.liker}>{this.props.likedBy} </HText>
            and <HText style={styles.liker}>{this.state.likesCount}</HText> others
          </HText>
        }

        <View>
          {this.props.comments.map((comment, i) => {
            return this.renderComment(comment, i);
          })}

          {this.state.userComment &&
            <Animatable.View
              animation='fadeIn'
              duration={750}
              onAnimationEnd={this.props.onPlayerComment}>

              {this.renderComment(this.state.userComment)}
            </Animatable.View>
          }
        </View>

        <HText style={styles.time}>
          {`${this.props.time} ago`.toUpperCase()}
        </HText>

        {this.props.commentable > 0 && !this.state.userComment &&
          <View style={styles.commentInputContainer}>
            <Animatable.View
              animation='hLazyFlash'
              duration={2000}
              iterationCount='infinite'
              ref={(textInputAttention) => this.textInputAttention = textInputAttention}>

              <TextInput
                placeholder='Add a comment...'
                placeholderTextColor={EStyleSheet.value('$appleOrange')}
                onFocus={this.onFocus}
                onSubmitEditing={this.onSubmitEditing}
                maxLength={80}
                keyboardAppearance='light'
                style={styles.commentInput} />
            </Animatable.View>
          </View>
        }
      </View>
    );
  }

  onSubmitEditing = (event) => this.addComment(event.nativeEvent.text);
  onFocus = () => this.textInputAttention.stopAnimation();

  onVideoTriggerPress = () => this.setState({videoPaused: false});
  onVideoProgress = (data) => {
    if (Platform.OS === 'ios') {
      this.setState({videoProgress: data.currentTime / data.playableDuration});
    }
  };
  onVideoEnd = () => this.setState({videoPaused: true});

  renderButtons () {
    const liked = (this.props.likesCount < this.state.likesCount);

    const buttons = [
      {
        icon: liked ? '&#xf004;' : '&#xf08a;',
        onPress: () => {
          if (liked) {
            this.setState({likesCount: this.state.likesCount - 1});
          } else {
            this.setState({likesCount: this.state.likesCount + 1});
          }
        }
      },
      {
        icon: '&#xf1d9;',
        onPress: () => eventEmitterInstance.emit('shareModal')
      }
    ];

    return buttons.map((button, i) => {
      return (
        <HSocialButton
          button={button}
          key={i}
          containerStyle={styles.buttonContainer} />
      );
    });
  }

  renderComment (comment, i = 0) {
    return (
      <HText key={i} style={styles.comment}>
        <HText style={styles.commentName}>{comment.person}</HText> {comment.text}
      </HText>
    );
  }

  addComment (text) {
    const comment = {person: people.iman.name, text: text};
    this.setState({userComment: comment});
  }
}

export default HInstaPost;

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
  location: {
    fontSize: '0.85rem',
    color: '#666'
  },
  mediaContainer: {
    marginHorizontal: '-1rem',
    marginVertical: '1rem'
  },
  videoPreviewContainer: {
    height: rwidth(125),
    justifyContent: 'center',
    backgroundColor: '#f3eee9'
  },
  videoPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: rwidth(100),
    height: rwidth(125),
    opacity: 0.2
  },
  video: {
    width: rwidth(100),
    height: rwidth(125)
  },
  videoProgress: {
    height: 3,
    borderWidth: 0,
    borderRadius: 0
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    marginRight: '0.25rem'
  },
  likes: {
    marginVertical: '1rem'
  },
  liker: {
    fontWeight: 'bold'
  },
  comment: {
    marginBottom: '0.33rem'
  },
  commentName: {
    fontWeight: 'bold'
  },
  time: {
    fontSize: '0.7rem',
    color: '#999'
  },
  commentInputContainer: {
    marginTop: '0.5rem',
    paddingTop: '1rem',
    borderColor: '#efefef',
    borderTopWidth: 1
  },
  commentInput: {
    fontFamily: '$systemFont',
    fontSize: '1rem'
  }
});
