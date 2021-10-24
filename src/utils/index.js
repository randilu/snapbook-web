import { v4 as uuidv4 } from 'uuid';
import { SESSION_USER_ID_KEY } from '../constants';

/**
 * Save user to session storage.
 */
export const createSessionForUser = () => {
  const userId = uuidv4();
  sessionStorage.setItem(SESSION_USER_ID_KEY, userId);
  return getUserFromSession();
};

/**
 * Get saved user from session storage.
 */
export const getUserFromSession = () => sessionStorage.getItem(SESSION_USER_ID_KEY);

export const getInitializedUser = () => {
  let userId = getUserFromSession();
  if (!userId) {
    userId = createSessionForUser();
  }
  return { userId };
};

/**
 * Swap items in a given array and returns a new swapped array.
 */
export const swapArrayItems = (arr, item1, item2) => {
  const newArr = [...arr];
  [newArr[item2], newArr[item1]] = [newArr[item1], newArr[item2]];
  return newArr;
};
