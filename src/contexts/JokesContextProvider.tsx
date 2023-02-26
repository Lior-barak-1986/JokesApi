import React, { useCallback, useContext, useEffect, useState } from "react";
import { Joke } from "../interfaces/joke";
import { fetchData } from "../lib/api";

const jokesContext = React.createContext<{
  jokes: { [key: number]: Joke | null };
  onClick: (num: number) => void;
}>({
  jokes: {},
  onClick: (num: number) => {},
});

export function useJokesContext() {
  return useContext(jokesContext);
}

interface JokesContextProviderProps {
  children: JSX.Element;
}

export default function JokesContextProvider({
  children,
}: JokesContextProviderProps) {
  const [jokes, setJokes] = useState<{ [key: number]: Joke | null }>({});
  const [timeouts, setTimeouts] = useState<{ [key: number]: number }>({});
  const callApi = useCallback(async () => {
    const res = await fetchData();
    const jokesObj: { [key: number]: Joke } = {};
    const timeoutsObj: { [key: number]: number } = {};
    res.forEach((joke: Joke) => {
      if (typeof jokes[joke.id] === "undefined") {
        jokesObj[joke.id] = joke;
        timeoutsObj[joke.id] = window.setTimeout(() => {
          removeJoke(joke.id);
        }, 8000);
      }
    });
    setTimeouts((prevTimeout) => ({ ...prevTimeout, ...timeoutsObj }));
    setJokes((prevJokes) => ({ ...prevJokes, ...jokesObj }));
  }, [jokes]);

  useEffect(() => {
    callApi();
    return () => {
      Object.keys(timeouts).forEach((key) => clearTimeout(key));
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      callApi();
    }, 20000);
    return () => {
      clearInterval(interval);
    };
}, [callApi]);

  const removeJoke = (id: number) => {
    setJokes((prevJokes) => {
      prevJokes[id] = null;
      return { ...prevJokes };
    });
  };
  const onClick = (num: number) => {
    if (timeouts[num]) {
      clearTimeout(timeouts[num]);
      setTimeouts((prevTimeouts) => {
        prevTimeouts[num] = 0;
        return prevTimeouts;
      });
    }
  };
  return (
    <jokesContext.Provider
      value={{
        jokes,
        onClick,
      }}
    >
      {children}
    </jokesContext.Provider>
  );
}
