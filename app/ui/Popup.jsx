import { h, Component } from 'preact';

import { initialize as initializeScorumJs } from './services/scorum';
import { initialize as initializeScorumSideJs } from './services/scorum-side';

import { Header } from './components/header/header';
import { Main } from './components/main/main';
import './scss/index.scss';

export class Popup extends Component {
  constructor(props) {
    super(props);

    initializeScorumJs();
    initializeScorumSideJs();
  }

  render() {
    return (
      <div class="app-content">
        <Header />
        <Main />
      </div>
    );
  }
}
