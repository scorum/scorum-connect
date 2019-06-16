import { h } from 'preact';

import { NETWORKS } from '../../../constants';
import './choose-network.scss';

export const ChooseNetwork = () => (
  <div class="header__network-component-wrapper">
    <select name="network" id="choose-network" class="scorum-network">
      <option value={NETWORKS.MAINNET}>{NETWORKS.MAINNET}</option>
    </select>
  </div>
);

