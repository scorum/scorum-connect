import { h } from 'preact';
import { IconClose } from '../icons/icon-close/icon-close';
import { IconScorumLogo } from '../icons/icon-scorum-logo/icon-scorum-logo';

export const Header = ({ onClose }) => (
  <div class="notification-header">
    <div class="notification-logo">
      <IconScorumLogo />
    </div>
    <div id="notification-close" class="notification-close" onClick={onClose}>
      <IconClose />
    </div>
  </div>
);
