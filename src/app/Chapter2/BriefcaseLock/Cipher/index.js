import React, { PureComponent } from 'react';
import ReactTimeout from 'react-timeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Animatable from 'react-native-animatable';
import shuffle from 'shuffle-array';

import Hint from './Hint';
import NeonSign from './NeonSign';

import neonSequence from './neonSequence';
import * as puzzle from '../../puzzle';

class Cipher extends PureComponent {
  securityCode = puzzle.securityCode();
  neonSequence = neonSequence();
  timeout = 666;
  container = null;

  state = {
    blocks: shuffle(this.securityCode, {copy: true}),
    x: null,
    y: null
  }

  componentDidMount () {
    this.props.setTimeout(() => this.nextHighlight(), this.timeout);
  }

  render () {
    return (
      <Animatable.View
        ref={(container) => { this.container = container; }}
        style={styles.blocksContainer}>

        {this.state.blocks.map((block, i) => {
          return (
            <Animatable.View
              key={i}
              animation='fadeIn'
              duration={this.timeout}
              delay={i * 50}>

              <NeonSign
                activeX={this.state.x}
                activeY={this.state.y}
                pattern={block.signPattern} />

              <Hint
                text={block.hintText} />

            </Animatable.View>
          );
        })}
      </Animatable.View>
    );
  }

  nextHighlight () {
    this.neonSequence.next();
    this.setState(this.neonSequence.xy);

    if (!this.neonSequence.ended) {
      this.props.setTimeout(() => this.nextHighlight(), this.timeout);
    }

    if (this.neonSequence.ended) {
      // re-shuffle
      this.container.fadeOut(this.timeout / 2).then(() => {
        // reset
        this.setState({blocks: []});
        // make container visible again
        this.container.fadeIn(1);

        this.neonSequence.restart();

        this.setState({blocks: shuffle(this.securityCode, {copy: true})});

        this.props.setTimeout(() => this.nextHighlight(), this.timeout);
      });
    }
  }
}

export default ReactTimeout(Cipher);

const styles = EStyleSheet.create({
  blocksContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
