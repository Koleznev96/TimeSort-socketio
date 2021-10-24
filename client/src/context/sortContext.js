import { createContext } from 'react';

function noop() {}

export const SortContext = createContext({
  data: null,
  isStatusSort: null,
  stopSort: noop
});
