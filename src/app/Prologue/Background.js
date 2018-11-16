import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth, rheight } from '@lib/rsize';

import prologueImages from '@images/prologue';

class Background extends PureComponent {
  render () {
    return (
      <Image source={prologueImages.bg} style={styles.bg} />
    );
  }
}

export default Background;

const styles = EStyleSheet.create({
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: rwidth(100),
    height: rheight(100)
  }
});
