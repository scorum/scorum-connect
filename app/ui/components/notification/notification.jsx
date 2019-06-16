import { h, Component } from 'preact';

import { Header } from './header';
import { withStore } from '../../hocs/with-store';
import { hideNotification, clearTransaction } from '../../store/actions';
import './notification.scss';

class NotificationUI extends Component {
  constructor() {
    super();
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    // ...
  }

  componentWillUnmount() {
    // ...
  }

  onClose() {
    this.props.hideNotification();
    this.props.clearTransaction();
  }

  render(props) {
    const { children, className } = props;
    return (
      <div id="notification-container" class={className || ''}>
        <div id="notification">
          <Header onClose={this.onClose} />
          <div class="notification-content">
            { children }
          </div>
          { /*
            <div class="notification-button-wrapper">
              <div id="notification-activate" class="notification-activate">
                <div class="notification-shell-button">
                  <a href="" target="_self">
                    <button id="notification-button">Do Smth</button>
                  </a>
                </div>
              </div>
              <div class="notification-info">
                <span>some important (or not) info</span>
              </div>
            </div>
            */
          }
        </div>
      </div>
    );
  }
}

export const Notification = withStore({ hideNotification, clearTransaction })(NotificationUI);
