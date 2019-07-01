import { h } from 'preact';
import './button.scss';

export const Button = ({
  children, isPrimary, id, onClick,
}) => (
  <button type="button" tabindex="0" id={id} onClick={onClick} class={isPrimary ? 'button button-primary' : 'button'}>
    <div><span>{children}</span></div>
  </button>
);
