import React from 'react';
import classNames from 'classnames';

import './Badge.scss';

function Badge({ color, onClick, className }) {
  return (
    <i
      onClick={onClick}
      className={classNames('badge', { [`badge--${color}`]: color }, className)}
    />
  );
}

export default Badge;
