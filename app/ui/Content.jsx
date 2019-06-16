import { h, Component } from 'preact';

import { ChooseAccount } from './components/choose-account/choose-account';
import { withStore } from './hocs/with-store';
import { setTransaction, showNotification } from './store/actions';
import { MESSAGE_EVENTS } from '../constants';

class ContentUI extends Component {
  constructor(props) {
    super(props);

    this.setUplisteners = this.setUplisteners.bind(this);
    this.setUplisteners();
  }

  setUplisteners() {
    const { setTransaction, showNotification } = this.props;

    window.addEventListener('message', ({ data, source }) => {
      if (source !== window || !data || !data.type) { return; }

      // TODO validate data
      switch (data.type) {
        case MESSAGE_EVENTS.WINDOW_SIGN_AND_BROADCAST:
          setTransaction({ trx: data.data });
          showNotification();
          break;
      }
    });
  }


  render() {
    return (
      <div>
        <ChooseAccount />
      </div>
    );
  }
}

export const Content = withStore({ setTransaction, showNotification })(ContentUI);
