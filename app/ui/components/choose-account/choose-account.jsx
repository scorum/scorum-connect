/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import extension from 'extensionizer';

import { Notification } from '../notification/notification';
import { Avatar } from '../avatar/avatar';
import { withStore } from '../../hocs/with-store';
import { hideNotification, clearTransaction } from '../../store/actions';
import { MESSAGE_EVENTS } from '../../../constants';
import './choose-account.scss';

const ChooseAccountUI = ({
  accounts,
  trx,
  notificationShowed,
  hideNotification,
  clearTransaction,
}) => {
  const accountsKeys = Object.keys(accounts);

  const clickHandler = (username) => {
    if (trx.injectInto) {
      trx.params[trx.injectInto] = username;
    }

    extension.runtime.sendMessage({
      action: MESSAGE_EVENTS.EXT_SIGN_AND_BROADCAST,
      data: {
        trx,
        username,
      },
    }, ({ response }) => {
      console.log(`The response from the background page: ${response}`);
      // TODO: check response
      hideNotification();
      clearTransaction();
    });
  };

  // TODO: remove arrow function (onClick) and change to link
  return (
    <div style={notificationShowed ? { display: 'block' } : { display: 'none' }}>
      <Notification className="choose-account">
        {
          accountsKeys.length ? accountsKeys.map(acc => (
            <div class="item" onClick={() => clickHandler(accounts[acc].username)}>
              <Avatar url={accounts[acc].avatar}/>
              <div class="description">{accounts[acc].username}</div>
            </div>
          )) : <div class="accounts-empty">You don't have accounts!</div>
        }
      </Notification>
    </div>
  );
};


export const ChooseAccount = withStore({ hideNotification, clearTransaction })(ChooseAccountUI);
