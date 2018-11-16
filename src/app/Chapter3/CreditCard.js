import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { _ } from '@app/script';

import HText from '@components/HText';
import HTextInput from '@components/HTextInput';

import * as puzzle from './puzzle';

class CreditCard extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
  }

  static defaultProps = {
    completed: false
  }

  state = {
    cvvEditable: true,
    errorMessage: false,
    hint: false
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <HText type='mono' style={styles.header}>{_('chapter3.creditCard.header.line1')}</HText>
          <HText type='mono' style={styles.header}>{_('chapter3.creditCard.header.line2')}</HText>
        </View>

        <View style={styles.row}>
          <View>
            <HText style={styles.label}>
              {_('chapter3.creditCard.cardNumber')}
            </HText>
            <View style={styles.creditCardValueContainer}>
              <HText type='icon' style={styles.creditCardIcon}>&#xf283;</HText>
              <HText style={styles.value}>✱✱✱ 0377</HText>
            </View>
          </View>
          <View>
            <HText style={styles.label}>
              {_('chapter3.creditCard.expDate')}
            </HText>
            <HText style={styles.value}>
              08/{(new Date()).getFullYear() + 1}
            </HText>
          </View>
          <View>
            <HText style={styles.label}>
              {_('chapter3.creditCard.cvv')}
            </HText>
            <HTextInput
              expectedValue={puzzle.cvvCode}
              selectTextOnFocus
              keyboardType='numeric'
              containerStyle={styles.cvvValueContainer}
              editable={!this.props.completed && this.state.cvvEditable}
              onSuccess={this.onSuccess}
              onError={this.onError}
              value={this.props.completed ? puzzle.cvvCode : ''} />
          </View>
        </View>

        {this.state.hint &&
          <HText type='mono' style={styles.hint}>
            {_('chapter3.creditCard.hint')}
          </HText>
        }
      </View>
    );
  }

  onError = (text) => {
    this.setState({error: true});

    // alternative code that can be read from image
    if (text === puzzle.altCode) {
      this.setState({hint: true});
    }

    this.props.onError();
  }
  onSuccess = () => {
    this.setState({error: false, hint: false, cvvEditable: false});
    this.props.onSuccess();
  }
}

export default ReactTimeout(CreditCard);

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fffd',
    paddingVertical: '1rem'
  },
  header: {
    textAlign: 'center'
  },
  row: {
    borderTopWidth: 1,
    borderColor: '#ddda',
    marginTop: '1rem',
    marginHorizontal: '1rem',
    paddingVertical: '1rem',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  label: {
    color: '#999',
    fontSize: '1rem',
    marginBottom: '0.25rem'
  },
  creditCardValueContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  creditCardIcon: {
    marginLeft: '0.075rem',
    marginRight: '0.5rem',
    color: '#666',
    fontSize: '1.35rem'
  },
  value: {
    marginVertical: '0.25rem',
    fontWeight: 'bold'
  },
  cvvValueContainer: {
    width: '3.33rem'
  },
  hint: {
    fontSize: '0.9rem',
    marginVertical: '0.5rem',
    textAlign: 'center'
  }
});
