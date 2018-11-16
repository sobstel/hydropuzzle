import React, { PureComponent } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HInstaPost from '@components/HInstaPost';

import people from '@app/people';
import videos from '@videos';
import chapter5Images from '@images/chapter5';

class EvilPlan extends PureComponent {
  render () {
    return (
      <View style={styles.container}>
        <HInstaPost
          person={people.dr_evil}
          location='Fat Trout Café at nearby lake'
          time='1 minute'
          video={videos.evilPlan}
          videoPreview={chapter5Images.evilPlanPreview}
          likesCount={2}
          likedBy='xenomorph'
          comments={_('chapter5.evilPlan.comments')}
          commentable={false} />
      </View>
    );
  }
}

export default EvilPlan;

const styles = EStyleSheet.create({
  container: {
    width: rwidth(100),
    backgroundColor: '#fff9'
  }
});
