import React from 'react';
import Navbar from '../../components/Common/Navbar';

import './styles.scss';

function Layout(props) {
  const { children } = props;
  return (
    <div className="main-container">
      <header>
        <Navbar />
      </header>
      {children}
    </div>
  );
}

export default Layout;
