import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HText from '@components/HText';
import Block from './Block';
import Controls from './Controls';

import * as puzzle from '../puzzle';

class GateCode extends Component {
  static propTypes = {
    completed: PropTypes.bool,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onSuccess: () => {}
  }

  state = {
    active: {x: 0, y: 0},
    controls: true,
    sequence: puzzle.initialSequence
  }

  variantSequence = puzzle.variantSequence();

  componentDidMount () {
    if (this.props.completed) {
      this.setState({sequence: puzzle.validSequence});
    }
  }

  render () {
    return (
      <Animatable.View animation='fadeInDown' style={styles.container}>
        <HText style={styles.text}>
          {_('chapter4.gateCode.message')}
        </HText>

        <Animatable.View
          ref={(board) => this.board = board}
          style={styles.board}>

          {this.state.sequence.map((row, y) => {
            return (
              <View style={styles.boardRow} key={y}>
                {row.map((variant, x) => {
                  return (
                    <Block
                      active={(x === this.state.active.x && y === this.state.active.y)}
                      variant={variant}
                      key={x} />
                  );
                })}
              </View>
            );
          })}
        </Animatable.View>

        <Controls
          disabled={this.props.completed || !this.state.controls}
          onChange={this.onChange}
          onDown={this.onDown}
          onRight={this.onRight} />

        <View style={styles.hintContainer}>
          <HText type='mono' style={styles.hint}>
            ::: {this.state.active.x + 1} , {this.state.active.y + 1} :::
          </HText>
        </View>

      </Animatable.View>
    );
  }

  onChange = () => {
    const {x, y} = this.state.active;
    const sequence = this.state.sequence;

    sequence[y][x] = (sequence[y][x] < this.variantSequence.length - 1 ? sequence[y][x] + 1 : 0);
    this.setState({sequence});

    if (puzzle.validateSequence(sequence)) {
      this.setState({
        active: {x: null, y: null},
        controls: false
      });

      this.board.flash(1000).then(() => {
        this.props.onSuccess();
      });
    }
  }

  onDown = () => {
    const y = (this.state.active.y < 3 ? this.state.active.y + 1 : 0);
    this.setState({active: {x: this.state.active.x, y: y}});
  }

  onRight = () => {
    const x = (this.state.active.x < 3 ? this.state.active.x + 1 : 0);
    this.setState({active: {x: x, y: this.state.active.y}});
  }
}

export default GateCode;

const styles = EStyleSheet.create({
  container: {
    width: rwidth(100),
    backgroundColor: '#fff9',
    paddingVertical: '2rem'
  },
  text: {
    fontFamily: '$monoFont',
    textAlign: 'center',
    fontSize: '1rem'
  },
  board: {
    marginTop: '2.5rem',
    marginBottom: '2rem'
  },
  boardRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  hint: {
    textAlign: 'center',
    marginVertical: '1rem'
  }
});
