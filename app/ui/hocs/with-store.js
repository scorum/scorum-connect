/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { Connect } from 'redux-zero/preact';

export function withStore(actions = {}) {
  return Child => props => (
    <Connect mapToProps={state => ({ ...state })} actions={actions}>
      {mappedProps => <Child {...mappedProps} {...props} />}
    </Connect>
  );
}
