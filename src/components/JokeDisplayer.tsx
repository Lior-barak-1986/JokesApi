import React from "react";
import { useJokesContext } from "../contexts/JokesContextProvider";
import Card from "./Card";
import InnerCard from "./InnerCard";
import styles from "./JokeDisplayer.module.css";

export default function JokeDisplayer() {
  const data = useJokesContext();
  const { jokes, onClick } = data;
  return (
    <>
      <h1>The Joke Application</h1>
      <p>Press on one of the cards and see what is the joke</p>
      {Object.keys(jokes).length === 0 && <p>Loading....</p>}
      <div className={styles.container}>
        {jokes &&
          Object.keys(jokes).map(
            (jokeKey:any) =>
              jokes[jokeKey] && (
                <Card
                  key={jokeKey}
                  onClick={() => onClick(jokeKey)}
                  >
                  <InnerCard data={jokes[jokeKey]?.setup} />
                  <InnerCard data={jokes[jokeKey]?.punchline} />
                </Card>
              )
          )}
      </div>
    </>
  );
}
