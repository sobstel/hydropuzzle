import React, { PureComponent } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HInstaPost from '@components/HInstaPost';

import chapter3Images from '@images/chapter3';
import people from '@app/people';

class AmazingAtomicActvity extends PureComponent {
  render () {
    return (
      <View style={styles.container}>
        <HInstaPost
          person={people.maharaja}
          location='Fat Trout Café at nearby lake'
          time='2 minutes'
          image={chapter3Images.steamlake}
          likesCount={66}
          likedBy='agent_smith'
          comments={_('chapter3.amazingAtomicActvity.comments')}
          commentable={false} />
      </View>
    );
  }
}

export default AmazingAtomicActvity;

const styles = EStyleSheet.create({
  container: {
    width: rwidth(100),
    backgroundColor: '#fff9'
  }
});
