import { h } from 'preact';
import { ChooseNetwork } from '../choose-network/choose-network';
import { IconSettings } from '../icons/icon-settings/icon-settings';
import { IconScorumLogo } from '../icons/icon-scorum-logo/icon-scorum-logo';
import { ExtensionPlatform } from '../../../helpers/extension-platform';
import './header.scss';

function openSettings() {
  ExtensionPlatform.openSettings();
}

export const Header = () => (
  <div class="header">
    <div class="header__contents">
      <div class="header__logo-container">
        <IconScorumLogo className="header__scorum-logo" />
      </div>
      <div class="header__account-menu-container">
        <ChooseNetwork />
        <div class="headers__settings" onClick={openSettings}>
          <IconSettings />
        </div>
      </div>
    </div>
  </div>
);

