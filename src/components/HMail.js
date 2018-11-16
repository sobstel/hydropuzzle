import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

import HAvatar from './HAvatar';
import HText from './HText';

import people from '@app/people';

class HMail extends PureComponent {
  static propTypes = {
    body: PropTypes.arrayOf(PropTypes.string).isRequired,
    completed: PropTypes.bool,
    footerContent: PropTypes.node,
    from: PropTypes.string.isRequired,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    footerContent: null,
    onEnd: () => {}
  }

  render () {
    const sender = people[this.props.from];

    return (
      <Animatable.View
        animation={this.props.completed ? '' : 'fadeInUp'}
        onAnimationEnd={this.props.onEnd}
        style={styles.container}>

        <View style={styles.header}>
          <HAvatar person={sender} />
          <HText style={styles.headerText}>
            {sender.name} &lt;{sender.email}&gt;
          </HText>
        </View>

        <View style={styles.paragraphsContainer}>
          {this.props.body.map((paragraph, i) => {
            return (
              <HText type='mono' key={i} style={styles.paragraph} numberOfLines={10}>
                {paragraph.trim()}
              </HText>
            );
          })}
        </View>

        {this.props.footerContent &&
          <View style={styles.footer}>
            {this.props.footerContent}
          </View>
        }
      </Animatable.View>
    );
  }
}

export default HMail;

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fffc'
  },
  header: {
    paddingHorizontal: '1rem',
    paddingVertical: '1rem',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff9'
  },
  headerText: {
    marginLeft: '0.75rem',
    fontWeight: '600'
  },
  paragraphsContainer: {
    marginHorizontal: '1rem',
    paddingVertical: '1rem'
  },
  paragraph: {
    paddingVertical: '0.5rem'
  },
  footer: {
    paddingHorizontal: '0.5rem',
    backgroundColor: '#fffa'
  }
});
