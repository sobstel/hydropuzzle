import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HText from '@components/HText';

import Control from './Control';

import * as puzzle from '../puzzle';

class Decrocoder extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    caretPos: 0,
    code: [],
    pointerPos: 0,
    cells: [0, 0, 0, 0, 0],
    interpreter: false,
    consoleInput: '',
    consoleError: '',
    success: false
  }

  commands = ['<', '>', '+', '-', '[', ']', '.'];

  interpreter = puzzle.interpreter();
  interpreterTimeout = null;
  interpreterDelay = 250;

  componentDidMount () {
    if (this.props.completed) {
      this.setState({
        success: true,
        consoleInput: puzzle.endCommand(),
        caretPos: null,
        pointerPos: null
      });
    }
  }

  render () {
    const code = this.state.code.concat(['']);

    return (
      <View style={styles.container}>
        <HText type='mono' style={styles.name}>{_('chapter6.decrocoder.name')}</HText>

        <View style={styles.core}>
          <View style={styles.commands}>
            {this.commands.map((label, i) => (
              <Control
                label={label}
                pos={i + 1}
                of={this.commands.length}
                disabled={this.state.success || this.state.interpreter}
                onPress={this.onCommandPress}
                key={i} />
            ))}
          </View>

          <View style={styles.code}>
            {code.map(this.renderCommand)}
          </View>

          <View style={styles.controls}>
            <Control label='LFT' pos={1} of={5}
              disabled={this.state.success || this.state.interpreter || this.state.caretPos === 0}
              onPress={this.onLeftControlPress} />

            <Control label='RGT' pos={2} of={5}
              disabled={this.state.success || this.state.interpreter || this.state.caretPos >= this.state.code.length}
              onPress={this.onRightControlPress} />

            <Control label='DEL' pos={3} of={5}
              disabled={this.state.success || this.state.interpreter || this.state.caretPos >= this.state.code.length}
              onPress={this.onDelControlPress} />

            <Control label='BCK' pos={4} of={5}
              disabled={this.state.success || this.state.interpreter || this.state.caretPos === 0}
              onPress={this.onBackControlPress} />

            <Control label={this.state.interpreter ? 'HALT' : 'RUN'} pos={5} of={5}
              disabled={this.state.success || this.ended() || this.state.code.length === 0}
              onPress={this.onReturnControlPress} />
          </View>
        </View>

        <View style={styles.visualizer}>
          {this.state.cells.map(this.renderCell)}
        </View>

        <Animatable.View animation='fadeIn'>
          <View style={styles.console}>
            <HText type='mono' style={styles.consoleHeader}>{_('chapter6.console.header')}</HText>
            {(this.state.interpreter || this.state.consoleInput.length > 0) &&
              <View style={styles.consoleInputContainer}>
                <HText type='mono' style={[styles.consoleInput, styles.consolePrompt]}>&gt;</HText>
                <HText type='mono' style={styles.consoleInput}>{this.state.consoleInput}</HText>
                {this.state.interpreter && !this.ended() &&
                  <Animatable.View animation='flash' easing='linear' iterationCount='infinite'>
                    <HText style={styles.consoleInput}>_</HText>
                  </Animatable.View>
                }
              </View>
            }
            {this.state.consoleError.length > 0 &&
              <Animatable.View animation='flash' easing='linear'>
                <HText type='mono' style={styles.consoleError}>
                  {this.state.consoleError.toUpperCase()}
                </HText>
              </Animatable.View>
            }
          </View>
        </Animatable.View>
      </View>
    );
  }

  renderCommand = (command, i) => {
    let commandStyles = styles.command;

    if (i === this.state.caretPos) {
      commandStyles = [commandStyles, styles.caret];
    }

    return (<HText type='mono' style={commandStyles} key={i}>{command}</HText>);
  }

  renderCell = (cell, i) => {
    let cellStyles = styles.cell;

    if (i === this.state.pointerPos) {
      cellStyles = [cellStyles, styles.pointer];
    }

    return (
      <View style={cellStyles} key={i}>
        <HText style={styles.cellText}>{cell}</HText>
      </View>
    );
  }

  onCommandPress = (label) => {
    if (this.state.code.length > 100) {
      this.setState({consoleError: 'max length: 100'});
      return;
    }

    if (this.state.consoleInput.length > 0) {
      this.setState({consoleInput: ''});
    }
    if (this.state.consoleError.length > 0) {
      this.setState({consoleError: ''});
    }

    const code = this.state.code.slice(0, this.state.caretPos)
      .concat(label)
      .concat(this.state.code.slice(this.state.caretPos));

    this.setState({code, caretPos: this.state.caretPos + 1});
  }

  onLeftControlPress = () => {
    this.setState({caretPos: this.state.caretPos - 1});
  }

  onRightControlPress = () => {
    this.setState({caretPos: this.state.caretPos + 1});
  }

  onDelControlPress = () => {
    const code = this.state.code.slice(0, this.state.caretPos)
      .concat(this.state.code.slice(this.state.caretPos + 1));

    this.setState({code});
  }

  onBackControlPress = () => {
    const code = this.state.code.slice(0, this.state.caretPos - 1)
      .concat(this.state.code.slice(this.state.caretPos));

    this.setState({code, caretPos: this.state.caretPos - 1});
  }

  onReturnControlPress = () => {
    if (this.state.interpreter) {
      this.props.clearInterval(this.interpreterTimeout);
      this.setState({consoleError: 'HALTED', interpreter: false});
    } else {
      this.startInterpreter();
    }
  }

  startInterpreter = () => {
    const initialState = this.interpreter.init();
    this.setState(initialState);

    this.interpreterTimeout = this.props.setTimeout(() => this.runInterpreter(initialState), this.interpreterDelay);
  }

  runInterpreter = (state) => {
    const nextState = this.interpreter.runNextCommand(this.state.code, state);
    this.setState(nextState);

    if (nextState.success) {
      this.props.onEnd();
      return;
    }

    if (nextState.interpreter) {
      this.interpreterTimeout = this.props.setTimeout(() => this.runInterpreter(nextState), this.interpreterDelay);
    }
  }

  ended = () => {
    return (this.state.consoleInput === puzzle.endCommand());
  }
}

export default ReactTimeout(Decrocoder);

const styles = EStyleSheet.create({
  $consoleColor: '#972',
  container: {
    width: rwidth(100),
    backgroundColor: '#333',
    alignItems: 'center'
  },
  name: {
    marginVertical: '1.25rem',
    letterSpacing: 1,
    color: '#ddd'
  },
  commands: {
    flexDirection: 'row',
    borderColor: '#3336',
    borderBottomWidth: 1
  },
  core: {
    backgroundColor: `${EStyleSheet.value('$appleOrange')}99`,
    alignItems: 'center'
  },
  code: {
    paddingVertical: '1rem',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: rwidth(96)
  },
  command: {
    width: '1rem',
    height: '1.75rem',
    textAlign: 'center',
    fontSize: '1.25rem',
    paddingVertical: 2
  },
  caret: {
    backgroundColor: `${EStyleSheet.value('$appleOrange')}88`,
    borderWidth: 0
  },
  controls: {
    flexDirection: 'row',
    borderColor: '#3336',
    borderTopWidth: 1
  },
  visualizer: {
    flexDirection: 'row',
    paddingVertical: '1.25rem'
  },
  cell: {
    backgroundColor: '#999',
    width: rwidth(12),
    height: rwidth(12),
    borderRadius: rwidth(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '0.5rem'
  },
  pointer: {
    backgroundColor: '#fff'
  },
  cellText: {
    color: '#333',
    fontWeight: '700'
  },
  console: {
    backgroundColor: '#111',
    width: rwidth(100),
    paddingVertical: '0.5rem',
    paddingHorizontal: '0.5rem'
  },
  consoleHeader: {
    color: '$consoleColor',
    fontSize: '1rem'
  },
  consoleInputContainer: {
    flexDirection: 'row'
  },
  consoleInput: {
    color: '$consoleColor'
  },
  consolePrompt: {
    marginRight: '0.25rem'
  },
  consoleError: {
    color: '#c33'
  }
});
