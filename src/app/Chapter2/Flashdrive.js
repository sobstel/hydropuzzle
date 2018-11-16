import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, View, ViewPropTypes } from 'react-native';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

import HTrigger from '@components/HTrigger';

import chapter2Images from '@images/chapter2';

class Flashdrive extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func,
    style: ViewPropTypes.style
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {},
    style: {}
  }

  render () {
    return (
      <Animatable.View
        animation={this.props.completed ? '' : 'fadeInDown'}
        duration={1000}
        style={[styles.container, this.props.style]}>

        <View style={styles.bodyContainer}>
          <Image source={chapter2Images.flashdriveBody} style={styles.body} />

          <HTrigger
            scale={0.9}
            text='&#xf287;'
            onPress={this.onPress}
            disabled={this.props.completed} />
        </View>

        <View>
          <Animatable.Image
            source={chapter2Images.flashdrivePlug}
            style={styles.plug}
            ref={(plug) => this.plug = plug} />

          <Animatable.Image
            source={chapter2Images.flashdriveCap}
            style={styles.cap}
            ref={(cap) => this.cap = cap} />
        </View>
      </Animatable.View>
    );
  }

  onPress = () => {
    this.cap.fadeOutDown(1000).then(() => {
      this.props.onEnd();
    });
  }
}

export default ReactTimeout(Flashdrive);

const styles = EStyleSheet.create({
  container: {
    width: '5.46rem',
    height: '13.33rem'
  },
  bodyContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    position: 'absolute',
    bottom: 0,
    width: '5.46rem',
    height: '8.8444.rem'
  },
  plug: {
    position: 'absolute',
    top: 0,
    width: '5.46rem',
    height: '3.6444rem'
  },
  cap: {
    position: 'absolute',
    top: 0,
    width: '5.46rem',
    height: '4rem'
  }
});
