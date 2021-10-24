import React from 'react';
import './styles.scss';

function Button(props) {
  const { children, onClick, disabled } = props;
  return (
    <button
      type="button"
      className="button"
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
