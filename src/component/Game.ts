import ERROR_TYPE from "../constant/ErrorType";
import "../styles/game.css";

// @link https://my-json-server.typicode.com/kakaopay-fe/resources/words
export interface Word {
  second: number;
  text: string;
}

export interface GameElements {
  startButton: HTMLButtonElement;
  inputElement: HTMLInputElement;
  timeElement: HTMLElement;
  scoreElement: HTMLElement;
  wordElement: HTMLElement;
}

class Game {
  words: Word[] = [];
  private _index = 0;
  private _success = 0;
  private _score = 0;
  private _time = 0;
  private _totalTime = 0;
  private _startTime = 0;
  private _timerId: ReturnType<typeof setInterval> | null = null;
  private _elements: GameElements;
  private _rootElement: HTMLDivElement;

  static INITIAL_WORD = "문제 단어";

  constructor(words: Word[]) {
    if (words.length === 0) {
      throw new Error(ERROR_TYPE.NO_WORDS);
    }

    this._score = words.length;
    this._time = words[0].second;
    this._index = 0;
    this.words = words;

    this._rootElement = this.createDOM(this._time, this._score);
    this._elements = this.mapElements(this._rootElement);
    this.attachEvent();
  }

  get rootElement(): HTMLElement {
    return this._rootElement;
  }

  createDOM = (time: number, score: number): HTMLDivElement => {
    const rootElement = document.createElement("div");

    rootElement.classList.add("game");
    rootElement.innerHTML = `
      <div class="top">
        <span class="display">남은 시간: <span id="time">${time}</span>초</span>
        <span class="display">점수: <span id="score">${score}</span>점</span>
      </div>
      <div id="word">${Game.INITIAL_WORD}</div>
      <div class="word-input">
        <input id="answer" type="text" disabled/>
      </div>
      <div class="bottom">
        <button class="game-btn" data-action="start">시작</button>
      </div>
  `;

    return rootElement;
  };

  mapElements = (rootElement: HTMLElement): GameElements => {
    const startButton = rootElement.querySelector(".game-btn");
    const inputElement = rootElement.querySelector("#answer");
    const scoreElement = rootElement.querySelector("#score");
    const timeElement = rootElement.querySelector("#time");
    const wordElement = rootElement.querySelector("#word");

    const isAllExist =
      startButton && inputElement && scoreElement && timeElement && wordElement;

    const hasCorrectType =
      inputElement instanceof HTMLInputElement &&
      startButton instanceof HTMLButtonElement;

    if (!isAllExist) {
      console.error("NO SUCH ELEMENT");
      throw new Error(ERROR_TYPE.NO_SUCH_ELEMENT);
    }

    if (!hasCorrectType) {
      console.error("There is invalid input elements or button elements");
      throw new Error(ERROR_TYPE.INVALID_ELEMENT_TYPE);
    }

    return {
      startButton: startButton as HTMLButtonElement,
      inputElement: inputElement as HTMLInputElement,
      scoreElement: scoreElement as HTMLElement,
      timeElement: timeElement as HTMLElement,
      wordElement: wordElement as HTMLElement,
    };
  };

  attachEvent = (): void => {
    const { startButton, inputElement } = this._elements;

    startButton.addEventListener("click", (): void => {
      const action = startButton.dataset.action;

      switch (action) {
        case "start":
          startButton.innerText = `초기화`;
          startButton.dataset.action = `resume`;
          this.startGame();
          break;
        case "resume":
          startButton.innerText = `시작`;
          startButton.dataset.action = `start`;
          this.resetGame();
          break;
        default:
          break;
      }
    });

    inputElement.addEventListener("keypress", (e: KeyboardEvent): void => {
      const words = this.words;
      const index = this._index;

      if (e.key === "Enter") {
        if (inputElement.value === words[index].text) {
          const diff = Date.now() - this._startTime;
          this.clearWord(diff);
        }
        inputElement.value = "";
      }
    });
  };

  startGame = (): void => {
    const { inputElement } = this._elements;

    inputElement.disabled = false;
    inputElement.focus();

    this.showWord(this.words[this._index]);
  };

  showWord = (word: Word): void => {
    console.log("asdfa", word);
    const { wordElement, timeElement } = this._elements;

    wordElement.innerText = `${word.text}`;
    timeElement.innerText = `${word.second}`;

    console.log("showword", wordElement.outerHTML, timeElement.outerHTML);

    this._startTime = Date.now();
    this._time = word.second;
    this._timerId = setInterval(() => {
      this._time--;

      if (this._time < 0) {
        this.clearWord();
      }

      timeElement.innerText = `${this._time}`;
    }, 1000);
  };

  clearWord = (diffMilliseconds = 0): void => {
    const { scoreElement } = this._elements;
    const isSucess = this._time >= 0;

    this._timerId && clearInterval(this._timerId);
    this._timerId = null;

    if (isSucess) {
      const diffSeconds = diffMilliseconds / 1000;
      this._totalTime += diffSeconds;
      this._success++;
    } else {
      this._score--;
      scoreElement.innerText = `${this._score}`;
    }

    this._index++;

    const isDone = this._index > this.words.length - 1;

    if (isDone) {
      this.routeToResult(this._score, this._success, this._totalTime);
      this.resetProps();
      return;
    }

    this.showWord(this.words[this._index]);
  };

  routeToResult = (score: number, success: number, totalTime: number): void => {
    const average = success ? (totalTime / success).toFixed(2) : "0";

    window.location.hash = `result?score=${score}&average=${average}`;
  };

  resetGame = (): void => {
    this.resetProps();

    this._time = this.words[0].second;
    this._score = this.words.length;

    const {
      inputElement,
      timeElement,
      scoreElement,
      wordElement,
    } = this._elements;

    inputElement.disabled = true;
    inputElement.value = "";
    timeElement.innerText = `${this._time}`;
    scoreElement.innerText = `${this._score}`;
    wordElement.innerText = `${Game.INITIAL_WORD}`;
  };

  resetProps = (): void => {
    this._index = 0;
    this._time = 0;
    this._totalTime = 0;
    this._startTime = 0;
    this._score = 0;
    this._success = 0;
    this._timerId && clearInterval(this._timerId);
    this._timerId = null;
  };
}

export default Game;
