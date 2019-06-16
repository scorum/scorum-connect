import { h } from 'preact';
import { Avatar } from '../avatar/avatar';
import { IconScr } from '../icons/icon-scr/icon-scr';
import { IconSp } from '../icons/icon-sp/icon-sp';
import { IconVp } from '../icons/icon-vp/icon-vp';

export const AccountItem = ({ username, sp, scr, vp, avatar, removeAccount }) => (
  <div class="item">
    <div class="menu-bar">
      <div class="selected-account">
        <div class="selected-account__name">{username}</div>
      </div>
    </div>
    <div class="balance-wrapper">
      <div class="view-balance">
        <div class="view-balance__container">
          <IconScr />
          <span class="balance">{scr}</span>
        </div>
        <div class="view-balance__container">
          <IconSp />
          <span class="balance">{sp}</span>
        </div>
        <div class="view-balance__container">
          <IconVp />
          <span class="balance">{vp}</span>
        </div>
        <div class="view-balance__container view-balance__account">
          <span class="vertical-divider mr-6"></span>
          <Avatar url={avatar} onClick={removeAccount} withOverlay />
        </div>
      </div>
    </div>
  </div>
);
