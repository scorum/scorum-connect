import { h } from 'preact';
import { IconUser } from '../icons/icon-user/icon-user';
import { IconClose } from '../icons/icon-close/icon-close';
import './avatar.scss';

export const Avatar = ({ url, onClick, withOverlay }) => {
  const length = 32;

  const baseProps = {
    class: 'photo',
    style: {
      height: length,
      width: length,
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    },
  };

  return (
    <div class="avatar" style={{ height: length, width: length }} onClick={onClick}>
      {
        url
        ? <div {...baseProps} />
        : <IconUser styles={{ width:length, height: length }} className='photo' />
      }
      {
        withOverlay && <IconClose className="photo-overlay" />
      }
    </div>
  );
};
