import { h, Component } from 'preact';
import head from 'lodash/head';

import { AccountsList } from '../accounts-list/accounts-list';
import { Button } from '../button/button';
import { withStore } from '../../hocs/with-store';
import { getAccountsByPublicKey, getAccounts, wifToPublic } from '../../services/scorum';
import { getProfile } from '../../services/scorum-side';
import { addAccount } from '../../store/actions';
import './main.scss';

class MainUI extends Component {
  constructor() {
    super();

    this.addAccountHandler = this.addAccountHandler.bind(this);
  }

  async addAccountHandler() {
    const privateKey = window.prompt('Enter private key', '');

    if (privateKey) {
      const arrayOfBcUsernames = head(await getAccountsByPublicKey([wifToPublic(privateKey)]));

      const username = head(arrayOfBcUsernames);
      if (username) {
        const bcProfile = head(await getAccounts([username]));
        const profile = await getProfile(username);

        this.props.addAccount({ username, privateKey, bcProfile, profile });
      }
    }
  }

  somethingElse() {
    console.log('something else click');
  }

  render() {
    return (
      <div class="main-container">
        <div class="main-container__inner">
          <AccountsList />
          <div class="main-container__buttons">
            <Button onClick={this.addAccountHandler} isPrimary id="add-account">Add account</Button>
            <Button onClick={this.somethingElse} id="something-else">Something else</Button>
          </div>
        </div>
      </div>
    );
  }
}

export const Main = withStore({ addAccount })(MainUI);
