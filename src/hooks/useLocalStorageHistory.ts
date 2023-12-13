import { useState } from 'react';
import { History, HistoryPayload } from '@interfaces/history.interface';

function useLocalStorageHistory() {
  const [history, setHistory] = useState<History[]>(() => {
    const storedHistory = window.localStorage.getItem('history');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  const addHistory = (data: HistoryPayload) => {
    const exist = history.find(
      (item) => item.type === data.type && item.data.id === data.data.id
    );
    if (exist) {
      removeHistory(exist.id);
    }

    const id = history.length > 0 ? history[history.length - 1].id + 1 : 1;
    const newHistory = [...history, { id, ...data } as History];

    setHistory(newHistory);

    window.localStorage.setItem('history', JSON.stringify(newHistory));
  };

  const removeHistory = (id: number) => {
    const newHistory = history.map((item) => {
      if (item.id === id) {
        history.splice(history.indexOf(item), 1);
      }
      return item;
    });

    setHistory(newHistory);

    window.localStorage.setItem('history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);

    window.localStorage.removeItem('history');
  };

  return { history, addHistory, removeHistory, clearHistory };
}

export default useLocalStorageHistory;
