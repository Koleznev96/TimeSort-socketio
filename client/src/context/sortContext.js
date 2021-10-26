import { createContext } from 'react';

function noop() {}

export const SortContext = createContext({
  data: null,
  strMass: null,
  initStrMass: noop,
  isStatusSort: null,
  stopSort: noop
});
