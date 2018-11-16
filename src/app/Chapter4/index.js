import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { loadGame, saveGame } from '@lib/storage';
import { _ } from '@app/script';

import HChapter from '@components/HChapter';
import HComicHeader from '@components/HComicHeader';
import HComicStory from '@components/HComicStory';
import HTrigger from '@components/HTrigger';
import CityRide from './CityRide';
import EndRide from './EndRide';
import FilmReel from './FilmReel';
import GateCode from './GateCode';
import DriverRating from './DriverRating';

import config from '@src/config';
import chapter4Images from '@images/chapter4';

class Chapter4 extends PureComponent {
  static propTypes = {
    onEnd: PropTypes.func
  }

  static defaultProps = {
    onEnd: () => {}
  }

  state = {
    ...config.initialState.chapter4,
    scrollable: true,
    cityRideDisabled: false
  }

  interval = null;

  componentDidMount = async () => {
    if (this.props.completed) {
      this.setState({
        cityRideTrigger: true,
        cityRide: true,
        header: true,
        gatemanTrigger: true,
        gateman: true,
        forgotHeader: true,
        gateTrigger: true,
        filmReel: true,
        gateCode: true,
        preEndRideHeader: true,
        endRide: true,
        driverRating: true,
        chapterTrigger: true
      });
    }
    if (!this.props.completed) {
      this.setState(await loadGame('currentState'));
    }
  };

  componentDidUpdate () {
    if (!this.props.completed) {
      saveGame('currentState', this.state);
    }
  }

  componentWillUnmount () {
    this.interval = null;
  }

  render () {
    return (
      <HChapter
        {...this.props}
        showTitleBanner={this.state.titleBanner}
        upperTitle={_('chapter4.upperTitle')}
        lowerTitle={_('chapter4.lowerTitle')}
        titleImage={chapter4Images.title}
        scrollable={this.state.scrollable}>

        {this.state.cityRideTrigger &&
          <HTrigger
            name='location'
            onPress={this.onCityRideTriggerPress}
            disabled={this.state.cityRide} />
        }

        {this.state.cityRide &&
          <CityRide
            onStart={this.onCityRideStart}
            onEnd={this.onCityRideEnd}
            completed={this.state.header || this.state.cityRideDisabled} />
        }

        {this.state.header &&
          <HComicHeader
            text={_('chapter4.header')}
            style={styles.header} />
        }

        {this.state.gatemanTrigger &&
          <HTrigger
            name='alcohol'
            onPress={this.onGatemanTriggerPress}
            disabled={this.state.gateman} />
        }

        {this.state.gateman &&
          <HComicStory
            images={chapter4Images.gatemanStory}
            headerText={_('chapter4.drunkGateman')}
            headerTimeout={1500}
            onEnd={this.onGatemanEnd}
            timeout={config['chapter4.gatemanStory.timeout']}
            completed={this.state.forgotHeader} />
        }

        {this.state.forgotHeader &&
          <HComicHeader
            text={_('chapter4.forgotHeader')} />
        }

        {this.state.gateTrigger &&
          <HTrigger
            name='guidebook'
            onPress={this.onGateTriggerPress}
            disabled={this.state.filmReel} />
        }

        {this.state.filmReel &&
          <FilmReel />
        }

        {this.state.gateCode &&
          <GateCode
            onSuccess={this.onGateCodeSuccess}
            completed={this.state.preEndRideHeader || this.state.endRide} />
        }

        {this.state.preEndRideHeader &&
          <HComicHeader
            text={_('chapter4.preEndRideHeader')}
            style={styles.preEndRideHeader} />
        }

        {this.state.endRide &&
          <EndRide
            onEnd={this.onEndRideEnd}
            completed={this.state.driverRating} />
        }

        {this.state.driverRating &&
          <DriverRating
            onEnd={this.onDriverRatingEnd}
            completed={this.state.chapterTrigger} />
        }

        {this.state.chapterTrigger &&
          <HTrigger
            name='nextChapter'
            onPress={this.props.onEnd} />
        }
      </HChapter>
    );
  }

  onCityRideTriggerPress = () => this.setState({cityRide: true});
  onCityRideStart = () => this.setState({scrollable: false});
  onCityRideEnd = () => {
    this.setState({scrollable: true});
    this.props.setTimeout(() => {
      this.setState({header: true, gatemanTrigger: true});
    }, 500);
  }
  onGatemanTriggerPress = () => this.setState({gateman: true, scrollable: false});
  onGatemanEnd = () => this.setState({forgotHeader: true, gateTrigger: true, scrollable: true});
  onGateTriggerPress = () => this.setState({filmReel: true, gateCode: true});
  onGateCodeSuccess = () => {
    this.setState({
      scrollable: false,
      preEndRideHeader: true,
      cityRideDisabled: true,
      endRide: true
    });
  };
  onEndRideEnd = () => this.setState({scrollable: true, driverRating: true});
  onDriverRatingEnd = () => {
    this.props.setTimeout(() => {
      this.setState({chapterTrigger: true});
    }, 500);
  }
}

export default ReactTimeout(Chapter4);

const styles = EStyleSheet.create({
  header: {
    marginTop: '3rem'
  },
  drunkGateman: {
    marginBottom: '2rem'
  },
  preEndRideHeader: {
    marginTop: '2rem'
  }
});
