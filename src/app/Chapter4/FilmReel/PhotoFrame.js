import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';

import HImage from '@components/HImage';
import HText from '@components/HText';

class PhotoFrame extends PureComponent {
  static propTypes = {
    image: PropTypes.number.isRequired,
    seq: PropTypes.number
  }

  static defaultProps = {
    seq: 0
  }

  seqPadding = this.calcSeqPadding();

  render () {
    const topSeqStyles = [styles.seq, styles.topSeq, {right: this.seqPadding}];
    const bottomSeqStyles = [styles.seq, styles.bottomSeq, {left: this.seqPadding}];

    return (
      <View style={styles.container}>

        <View style={[styles.bar, styles.topBar]}>
          {this.props.seq &&
            <HText style={topSeqStyles}>{this.props.seq}</HText>
          }
          {this.renderHoles()}
        </View>

        <HImage source={this.props.image} style={styles.photo} containerStyle={styles.photoContainer} />

        <View style={[styles.bar, styles.bottomBar]}>
          {this.props.seq &&
            <HText style={bottomSeqStyles}>{this.props.seq}</HText>
          }
          {this.renderHoles()}
        </View>

      </View>
    );
  }

  renderHoles () {
    return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      return (<View style={styles.hole} key={i} />);
    });
  }

  calcSeqPadding () {
    const quarterWidth = rwidth(25);

    const v1 = ((this.props.seq / 10) - 1);
    const v2 = ((this.props.seq % 10) - 1);

    let padding = parseInt(v2 * quarterWidth + (v1 / 4) * quarterWidth);
    padding = Math.min(Math.max(padding, 10), rwidth(100) - 30);

    return padding;
  }
}

export default PhotoFrame;

const styles = EStyleSheet.create({
  container: {
    width: rwidth(100),
    backgroundColor: '#222'
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: rwidth(100),
    height: '3.75rem'
  },
  topBar: {
    paddingBottom: '0.25rem'
  },
  bottomBar: {
    paddingTop: '0.25rem'
  },
  hole: {
    backgroundColor: '#ddd',
    borderRadius: 2,
    width: '1.05rem',
    height: '1.5rem'
  },
  seq: {
    position: 'absolute',
    fontSize: '0.8rem',
    letterSpacing: 2,
    color: '#ff09',
    fontWeight: '600'
  },
  topSeq: {
    alignSelf: 'flex-start'
  },
  bottomSeq: {
    alignSelf: 'flex-end'
  },
  photoContainer: {
    marginHorizontal: '0.75rem'
  },
  photo: {
    borderRadius: 5
  }
});
