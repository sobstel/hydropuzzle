import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { _ } from '@app/script';

import HChat from '@components/HChat';

import config from '@src/config';
import people from '@app/people';
import memes from '@images/memes';

class CompanyChat extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func,
    onStart: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    messages: _('chapter1.companyChat.messages'),
    onEnd: () => {},
    onStart: () => {}
  }

  render () {
    return (
      <HChat
        title={_('chapter1.companyChat.title')}
        messages={this.props.messages}
        baseMs={config['chapter1.companyChat.baseMs']}
        people={people}
        memes={memes}
        onStart={this.props.onStart}
        onEnd={this.props.onEnd}
        completed={this.props.completed} />
    );
  }
}

export default CompanyChat;
