import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';


export const useSort = () => {
  const [data, setData] = useState(null);
  const [strMass, setAtrMass] = useState(null);
  const [isStatusSort, setIsStatusSort] = useState(false);
  const socketRef = useRef(null);

  const stopSort = () => {
    setIsStatusSort(false);
  }

  const initStrMass = (str) => {
    setAtrMass(str);
  }

  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on('new_iteration_sort', (data) => {
      if (data.status) {
        setIsStatusSort(true);
      } else {
        setIsStatusSort(false);
      }
      setData(data.data);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return { data, strMass, initStrMass, isStatusSort, stopSort };
};
