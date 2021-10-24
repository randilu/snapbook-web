import React from 'react';
import { DEFAULT_USER_ID } from '../constants';

export const UserContext = React.createContext({ userId: DEFAULT_USER_ID });
