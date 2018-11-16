import React, { PureComponent } from 'react';
import { Alert, Linking, Platform, Share, View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Animatable from 'react-native-animatable';
import { _ } from '@app/script';

import HButton from '@components/HButton';
import HChapter from '@components/HChapter';
import HText from '@components/HText';

import ThankYou from './ThankYou';

import creditsImages from '@images/credits';

class Credits extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onReset: PropTypes.func.isRequired
  }

  static defaultProps = {
    completed: false
  }

  render () {
    return (
      <HChapter {...this.props} showTitleBanner={false} bgImage={creditsImages.bg} scrollable>
        <HText type='mono' style={styles.header}>
          {_('credits.header')}
        </HText>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <HButton appearance='dark' name='chapterUp' onPress={this.props.onPrevChapter} />
            <HText type='mono'>back</HText>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          {Platform.OS === 'ios' &&
            <View style={styles.buttonContainer}>
              <HButton appearance='dark' name='star' onPress={this.rate} />
              <HText type='mono'>rate</HText>
            </View>
          }

          <View style={styles.buttonContainer}>
            <HButton appearance='dark' name='share' onPress={this.share} />
            <HText type='mono'>share</HText>
          </View>

          <View style={styles.buttonContainer}>
            <HButton appearance='dark' name='backInTime' onPress={this.restart} />
            <HText type='mono'>restart</HText>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <HButton appearance='dark' name='volt' onPress={this.volt} />
            <HText type='mono'>volt</HText>
          </View>

          <View style={styles.buttonContainer}>
            <HButton appearance='dark' name='twitter' onPress={this.twitter} />
            <HText type='mono'>twitter</HText>
          </View>

          <View style={styles.buttonContainer}>
            <HButton appearance='dark' name='instagram' onPress={this.instagram} />
            <HText type='mono'>insta</HText>
          </View>
        </View>

        {_('credits.messages').map((credit, i) => (
          <Animatable.View animation='fadeIn' delay={this.messageDelay(i)} key={i}>
            <View style={styles.creditContainer}>
              <HText type='mono' style={styles.credit}>{credit}</HText>
            </View>
          </Animatable.View>
        ))}

        <Animatable.View animation='fadeIn' delay={this.messageDelay(_('credits.messages').length + 1)}>
          <ThankYou />
        </Animatable.View>
      </HChapter>
    );
  }

  rate = () => Linking.openURL('https://itunes.apple.com/app/id1294812505?mt=8&ls=1');
  restart = () => this.restart();
  share = () => Share.share({message: 'Hydropuzzle. Can you solve the mystery? https://www.hydropuzzle.com'});
  volt = () => Linking.openURL('http://www.sobstel.org/voltpuzzle/');
  twitter = () => this.openURL('twitter://user?screen_name=sobstel', 'https://twitter.com/sobstel');
  instagram = () => this.openURL('instagram://user?username=sobsteldev', 'https://www.instagram.com/sobsteldev/');

  openURL = (url, fallbackUrl) => {
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url).catch(() => Linking.openURL(fallbackUrl));
    } else {
      Linking.openURL(fallbackUrl);
    }
  }

  restart = () => {
    Alert.alert(
      'Are you sure?',
      'Reset your progress and start anew',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: this.props.onReset
        }
      ],
      { cancelable: false }
    );
  }

  messageDelay (i) {
    return (400 + i * 200);
  }
}

export default Credits;

const styles = EStyleSheet.create({
  header: {
    fontSize: '1.2rem',
    marginTop: '3rem',
    marginBottom: '2rem',
  },
  // OLD HEADER (LOGO) STYLE
  // name: {
  //   backgroundColor: 'transparent',
  //   fontFamily: '$titleFont',
  //   fontSize: '3rem',
  //   letterSpacing: 3,
  //   textAlign: 'center',
  //   marginTop: '3rem'
  // },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: '2rem',
    marginBottom: '1rem'
  },
  buttonContainer: {
    width: '23%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  creditContainer: {
    width: '100%',
    paddingHorizontal: '1rem',
    paddingVertical: '1rem',
    backgroundColor: '#fff4',
    marginTop: '0.75rem'
  },
  credit: {
    fontSize: '0.9rem',
    lineHeight: '1.35rem',
    textAlign: 'center'
  }
});
