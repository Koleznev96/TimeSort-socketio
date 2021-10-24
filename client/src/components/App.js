import React from 'react';

import { useSort } from '../hooks/sort.hook';
import { SortContext } from '../context/sortContext';

import { RootApp } from './RootApp/RootApp';

function App() {
  const { data, isStatusSort, stopSort } = useSort();

  return (
    <SortContext.Provider
      value={{data, isStatusSort, stopSort}}
    >
        <RootApp />
    </SortContext.Provider>
  );
}

export default App;
