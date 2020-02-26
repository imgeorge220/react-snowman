import React, { useState } from "react";
import "./Snowman.css";
import { randomWord, ENGLISH_WORDS } from "./words";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

function Snowman({ maxWrong, images, words }) {
  /** by default, allow 6 guesses and use provided gallows images. */

  const [nWrong, updateNWrong] = useState(0);
  const [guessed, updateGuessed] = useState(new Set());
  const [answer, updateAnswer] = useState(randomWord(words));

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  function guessedWord() {
    return answer
      .split("")
      .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
      - add to guessed letters
      - if not in answer, increase number-wrong guesses
  */
  function handleGuess(evt) {
    let ltr = evt.target.value;
    updateGuessed(g => {
      const newGuessed = new Set(g);
      newGuessed.add(ltr);
      return newGuessed;
    });

    updateNWrong(n => n + (answer.includes(ltr) ? 0 : 1));
  }

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
        data-testid={`btn-${ltr}`}
      >
        {ltr}
      </button>
    ));
  }

  function resetGame() {
    updateNWrong(0);
    updateGuessed(new Set());
    updateAnswer(randomWord(words));
  }

  const buttonArea =
    <div>
      <p>Number of Guesses Left: {maxWrong - nWrong}</p>
      <p className="Snowman-word" data-testid="word">{guessedWord()}</p>
      <p>{generateButtons()}</p>
    </div>;

  const failArea =
    <div>
      <p>GAME OVER!</p>
      <p>Correct word was: {answer}</p>
    </div>;

  /** render: render game */
  return (
    <div className="Snowman">
      <img src={images[nWrong]} data-testid={`img-${images[nWrong]}`} alt="" />
      {nWrong < maxWrong ? buttonArea : failArea}
      <button onClick={resetGame} data-testid="reset-btn">RESET</button>
    </div>
  );
}

Snowman.defaultProps = {
  maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6],
  words: ENGLISH_WORDS,
};

export default Snowman;
