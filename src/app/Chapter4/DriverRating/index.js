import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HText from '@components/HText';
import Star from './Star';

class DriverRating extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    disabled: false,
    rating: null
  }

  componentDidMount () {
    if (this.props.completed) {
      this.setState({disabled: true, rating: 5});
    }
  }

  render () {
    const stars = [...Array(5)].map((val, key) => key < this.state.rating);

    return (
      <View style={styles.container}>
        <HText type='mono' style={styles.headerText}>
          {_('chapter4.driverRating.header')}
        </HText>

        <View style={styles.stars}>
          {stars.map((nonEmpty, i) => (
            <Star
              rating={i + 1}
              empty={!nonEmpty}
              disabled={this.state.disabled}
              onPress={this.setRating}
              key={i} />
          ))}
        </View>

        {this.state.rating > 0 && this.state.rating <= 3 &&
          <HText type='mono' style={styles.message}>
            {_('chapter4.driverRating.rateLow')}
          </HText>
        }
        {this.state.rating === 4 &&
          <HText type='mono' style={styles.message}>
            {_('chapter4.driverRating.rate4')}
          </HText>
        }
        {this.state.rating === 5 &&
          <HText type='mono' style={[styles.message, styles.successMessage]}>
            {_('chapter4.driverRating.rate5')}
          </HText>
        }
      </View>
    );
  }

  setRating = (rating) => {
    if (this.state.disabled) {
      return;
    }

    this.setState({rating});

    if (rating === 5) {
      this.setState({disabled: true});
      this.props.onEnd();
    }
  }
}

export default DriverRating;

const styles = EStyleSheet.create({
  container: {
    width: rwidth(100),
    backgroundColor: '#fff9',
    marginTop: '3rem',
    marginBottom: '0.5rem',
    paddingVertical: '1.25rem'
  },
  headerText: {
    fontSize: '1rem',
    textAlign: 'center'
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '2rem',
    marginVertical: '1rem'
  },
  message: {
    color: '#933',
    paddingHorizontal: '3rem',
    fontWeight: '500',
    textAlign: 'center'
  },
  successMessage: {
    color: '#363'
  }
});
