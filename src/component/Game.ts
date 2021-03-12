// @link https://my-json-server.typicode.com/kakaopay-fe/resources/words
export interface Word {
  second: number;
  text: string;
}

function renderGame(container: HTMLElement, words: Word[]): Game {
  return new Game(container, words);
}

class Game {
  container: HTMLElement;
  words: Word[] = [];
  private _index = 0;
  private _success = 0;
  private _score = 0;
  private _time = 0;
  private _timeSum = 0;
  private _startTime = 0;
  private _timerId: ReturnType<typeof setInterval> | null = null;

  constructor(container: HTMLElement, words: Word[]) {
    if (words.length === 0) {
      throw new Error("NO WORDS");
    }

    this.container = container;
    this._score = words.length;
    this._time = words[0].second;
    this._index = 0;
    this.words = words;

    this.attachDOM(this._time, this._score);
    this.attachEvent();
  }

  attachDOM = (time: number, score: number): void => {
    const template = this.getTemplate(time, score);

    this.container.innerHTML = template;
  };

  getTemplate = (time: number, score: number): string => {
    return `
      <div id="container">
        <div class="top">
          <span id="time">남은 시간: ${time}초</span>
          <span id="score">점수: ${score}점</span>
        </div>
        <div id="word">문제 단어</div>
        <div class="word-input">
          <input id="answer" type="text" disabled/>
        </div>
        <div class="bottom">
          <button class="game-btn" data-action="start">시작</button>
        </div>
      </div>
      `;
  };

  attachEvent = (): void => {
    const startButton = document.querySelector(".game-btn") as HTMLElement;
    const inputElement = document.getElementById("answer") as HTMLInputElement;

    if (!startButton || !inputElement) {
      console.warn("Element not found");
      return;
    }

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
    const scoreElement = document.getElementById("score");
    const timeElement = document.getElementById("time");
    const inputElement = document.getElementById("answer") as HTMLInputElement;

    if (!scoreElement || !timeElement || !inputElement) return;

    inputElement.disabled = false;
    inputElement.focus();

    this.showWord(this.words[this._index]);
  };

  showWord = (word: Word): void => {
    const scoreElement = document.getElementById("score");
    const timeElement = document.getElementById("time");
    const inputElement = document.getElementById("answer");
    const wordElement = document.getElementById("word");

    if (!scoreElement || !timeElement || !inputElement || !wordElement) return;

    wordElement.innerText = `${word.text}`;
    timeElement.innerText = `남은 시간: ${word.second}초`;
    this._startTime = Date.now();

    this._time = word.second;
    this._timerId = setInterval(() => {
      this._time--;

      if (this._time === 0) {
        this.clearWord();
      }

      timeElement.innerText = `남은 시간: ${this._time}초`;
    }, 1000);
  };

  clearWord = (diffMilliseconds = 0): void => {
    const scoreElement = document.getElementById("score");
    const timeElement = document.getElementById("time");

    this._timerId && clearInterval(this._timerId);
    this._timerId = null;

    if (!scoreElement || !timeElement) return;

    const isSucess = !(this._time === 0);

    if (isSucess) {
      const diffSeconds = diffMilliseconds / 1000;
      this._timeSum += diffSeconds;
      this._success++;
    } else {
      this._score--;
      scoreElement.innerText = `점수: ${this._score}점`;
    }

    this._index++;

    const isDone = this._index > this.words.length - 1;

    if (isDone) {
      const average = (this._timeSum / this._success).toFixed(2);

      window.location.hash = `result?score=${this._score}&average=${average}`;
      this.resetProps();

      return;
    }

    this.showWord(this.words[this._index]);
  };

  resetGame = (): void => {
    this.resetProps();

    this._time = this.words[0].second;
    this._score = this.words.length;

    const scoreElement = document.getElementById("score");
    const timeElement = document.getElementById("time");
    const wordElement = document.getElementById("word");
    const inputElement = document.getElementById("answer") as HTMLInputElement;

    inputElement.disabled = true;

    timeElement!.innerText = `남은 시간: ${this._time}초`;
    scoreElement!.innerText = `점수 : ${this._score}점`;
    wordElement!.innerText = `문제 단어`;
  };

  resetProps = (): void => {
    this._index = 0;
    this._time = 0;
    this._timeSum = 0;
    this._startTime = 0;
    this._score = 0;
    this._success = 0;
    this._timerId && clearInterval(this._timerId);
    this._timerId = null;
  };
}

export default renderGame;
