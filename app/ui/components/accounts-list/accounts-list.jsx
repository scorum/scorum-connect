import { h, Component } from 'preact';

import { AccountItem } from './account-item';
import { withStore } from '../../hocs/with-store';
import { removeAccount } from '../../store/actions';
import { floorLocalFloatAmount, floorLocalAmountToK } from '../../../helpers/balance';
import './accounts-list.scss';


class AccountsListUI extends Component {
  constructor() {
    super();

    this.removeAccount = this.removeAccount.bind(this);
  }

  componentWillUnmount() {
    // ...
  }

  removeAccount(username) {
    // TODO: change it. because bind functions = accounts.length
    return () => {
      if (confirm('Are you sure you want to remove account?')) {
        this.props.removeAccount(username);
      }
    };
  }

  render(props) {
    const { accounts } = props;

    const accountsKeys = Object.keys(accounts);
    return (
      <div class="accounts-list" id="accounts-list">
        {
          accountsKeys.length ? accountsKeys.map(acc => (
            <AccountItem
              username={accounts[acc].username}
              scr={floorLocalAmountToK(accounts[acc].scr, 2)}
              sp={floorLocalAmountToK(accounts[acc].sp, 2)}
              vp={floorLocalFloatAmount(accounts[acc].vp / 100, 2)}
              avatar={accounts[acc].avatar}
              removeAccount={this.removeAccount(accounts[acc].username)}
            />
          )) : <div class="accounts-empty">Add your first account!</div>
        }
      </div>
    );
  }
}

export const AccountsList = withStore({ removeAccount })(AccountsListUI);
