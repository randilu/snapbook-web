import React from 'react';
import './App.scss';
import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Gallery from './views/Gallery';
import Album from './views/Album';
import { ROUTES } from './constants';
import { UserContext } from './context/userContext';
import { getInitializedUser } from './utils';

toast.configure();

function App() {
  return (
    <UserContext.Provider value={getInitializedUser()}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Gallery />
            </Route>
            <Route path={ROUTES.GALLERY} key="gallery" exact>
              <Gallery />
            </Route>
            <Route path={ROUTES.ALBUM} key="album" exact>
              <Album />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
