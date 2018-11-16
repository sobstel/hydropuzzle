import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class HContainer extends PureComponent {
  render () {
    return (
      <View>
        {this.props.debug &&
          <View style={styles.debugBar}>
            <Text style={styles.debugText}>DEBUG MODE</Text>
          </View>
        }

        {this.props.children}
      </View>
    );
  }
}

export default HContainer;

const styles = EStyleSheet.create({
  debugBar: {
    zIndex: 666,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingVertical: 7,
    backgroundColor: '#c006'
  },
  debugText: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: '0.9rem',
    letterSpacing: 2
  }
});
