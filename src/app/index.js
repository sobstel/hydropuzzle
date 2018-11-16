import React, { PureComponent } from 'react';
import KeepAwake from 'react-native-keep-awake';
import { loadGame, saveGame } from '@lib/storage';

import HContainer from '@components/HContainer';

import Prologue from '@app/Prologue';
import Chapter1 from '@app/Chapter1';
import Chapter2 from '@app/Chapter2';
import Chapter3 from '@app/Chapter3';
import Chapter4 from '@app/Chapter4';
import Chapter5 from '@app/Chapter5';
import Chapter6 from '@app/Chapter6';
import Chapter7 from '@app/Chapter7';
import Credits from '@app/Credits';
import ShareModal from '@app/ShareModal';

import config from '@src/config';

class App extends PureComponent {
  state = {
    currentLevel: config.initialState.chapter || 0,
    activeLevel: config.initialState.chapter || 0,
    levelChange: 0
  }

  componentDidMount = async () => {
    const currentLevel = await loadGame('currentLevel');
    const activeLevel = await loadGame('activeLevel');
    if (currentLevel !== null && activeLevel !== null) {
      this.setState({ activeLevel: -1 }); // force unmount and mount
      this.setState({ currentLevel, activeLevel });
    }
  }

  render () {
    return (
      <HContainer debug={config['DEBUG']}>
        <ShareModal />

        {this.renderChapter()}

        <KeepAwake />
      </HContainer>
    );
  }

  renderChapter () {
    switch (this.state.activeLevel) {
      case 0:
        return (
          <Prologue
            completed={this.state.currentLevel > 0}
            onEnd={this.nextChapter} />
        );
      case 1:
        return (
          <Chapter1
            completed={this.state.currentLevel > 1}
            onPrevChapter={this.prevChapter}
            onEnd={this.nextChapter}
            levelChange={this.state.levelChange} />
        );
      case 2:
        return (
          <Chapter2
            completed={this.state.currentLevel > 2}
            onPrevChapter={this.prevChapter}
            onEnd={this.nextChapter}
            levelChange={this.state.levelChange} />
        );
      case 3:
        return (
          <Chapter3
            completed={this.state.currentLevel > 3}
            onPrevChapter={this.prevChapter}
            onEnd={this.nextChapter}
            levelChange={this.state.levelChange} />
        );
      case 4:
        return (
          <Chapter4
            completed={this.state.currentLevel > 4}
            onPrevChapter={this.prevChapter}
            onEnd={this.nextChapter}
            levelChange={this.state.levelChange} />
        );
      case 5:
        return (
          <Chapter5
            completed={this.state.currentLevel > 5}
            onPrevChapter={this.prevChapter}
            onEnd={this.nextChapter}
            levelChange={this.state.levelChange} />
        );
      case 6:
        return (
          <Chapter6
            completed={this.state.currentLevel > 6}
            onPrevChapter={this.prevChapter}
            onEnd={this.nextChapter}
            levelChange={this.state.levelChange} />
        );
      case 7:
        return (
          <Chapter7
            completed={this.state.currentLevel > 7}
            onPrevChapter={this.prevChapter}
            onEnd={this.nextChapter}
            levelChange={this.state.levelChange} />
        );
      case 8:
        return (
          <Credits
            completed={this.state.currentLevel > 8}
            onPrevChapter={this.prevChapter}
            onReset={this.reset}
            levelChange={this.state.levelChange} />
        );
    }

    return null;
  }

  prevChapter = () => {
    const activeLevel = this.state.activeLevel - 1;

    this.setState({activeLevel, levelChange: -1});

    saveGame('activeLevel', activeLevel);
    saveGame('currentLevel', this.state.currentLevel);
  }

  nextChapter = () => {
    const activeLevel = this.state.activeLevel + 1;
    const currentLevel = Math.max(activeLevel, this.state.currentLevel);

    this.setState({activeLevel, currentLevel, levelChange: 1});

    saveGame('activeLevel', activeLevel);
    saveGame('currentLevel', currentLevel);
    if (currentLevel > this.state.currentLevel) {
      saveGame('currentState', null);
    }
  }

  reset = () => {
    const activeLevel = 0;
    const currentLevel = 0;

    this.setState({activeLevel, currentLevel, levelChange: 0});

    saveGame('activeLevel', activeLevel);
    saveGame('currentLevel', currentLevel);
  }
}

export default App;
