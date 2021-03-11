// @link https://my-json-server.typicode.com/kakaopay-fe/resources/words
export interface Word {
  second: number;
  text: string;
}

class Game {
  words: Word[];
  totalScore: number;
  time: number;
  timerId: ReturnType<typeof setInterval> | null = null;
  word: string | null = null;
  container: HTMLElement;

  constructor(words: Word[], container: HTMLElement) {
    this.words = [{ second: 10, text: "a" }];
    this.totalScore = words.length;
    this.time = words[0].second;
    this.container = container;
    // this.words = words.reverse();

    this.connectedCallback();
  }

  connectedCallback = (): void => {
    const template = this.getTemplate(this.time, this.totalScore);

    this.container.innerHTML = template;
    this.attachEvent();
  };

  getTemplate = (time = 0, score = 0): string => {
    return `
      <div id="container">
        <div class="top">
          <span id="time">남은 시간: ${time}초</span>
          <span id="score">점수: ${score}점</span>
        </div>
        <div id="word">문제 단어</div>
        <div class="word-input">
          <input id="answer" type="text" />
        </div>
        <div class="bottom">
          <button class="game-btn" data-action="start">시작</button>
        </div>
      </div>
      `;
  };

  attachEvent = (): void => {
    const startButton = document.querySelector(".game-btn") as HTMLElement;

    if (!startButton) {
      console.warn("start button not found");
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
          break;
        default:
          break;
      }
    });
  };

  startGame = (): void => {
    const scoreElement = document.getElementById("score");
    const timeElement = document.getElementById("time");
    const inputElement = document.getElementById("answer") as HTMLInputElement;

    if (!scoreElement || !timeElement || !inputElement) return;

    inputElement.focus();

    // @TODO: 이벤트리스너 제거
    inputElement.addEventListener("keypress", (e: KeyboardEvent): void => {
      if (e.key === "Enter") {
        console.log("검사해");
        if (inputElement.value === this.word) {
          console.log("맞춤");
          this.clearWord();
        }
        inputElement.value = "";
      }
    });

    const word = this.words.pop();

    if (!word) {
      throw new Error("단어가 없습니다");
    }

    this.showWord(word);
  };

  showWord = (word: Word): void => {
    const scoreElement = document.getElementById("score");
    const timeElement = document.getElementById("time");
    const inputElement = document.getElementById("answer");
    const wordElement = document.getElementById("word");

    if (!scoreElement || !timeElement || !inputElement || !wordElement) return;

    this.word = word.text;
    this.time = word.second;
    wordElement.innerText = `${word.text}`;

    this.timerId = setInterval(() => {
      this.time--;

      if (this.time === 0) {
        this.clearWord();
      }

      timeElement.innerText = `남은 시간: ${this.time}초`;
    }, 1000);
  };

  clearWord = (): void => {
    const scoreElement = document.getElementById("score");
    const timeElement = document.getElementById("time");

    if (!scoreElement || !timeElement) return;

    this.timerId && clearInterval(this.timerId);
    this.timerId = null;
    this.word = null;

    if (this.time === 0) {
      this.totalScore--;
      scoreElement.innerText = `점수: ${this.totalScore}점`;
    }

    const word = this.words.pop();

    if (!word) {
      console.log("go to result page");

      window.location.hash = "result";
      return;
    }

    this.showWord(word);
  };
}

export default Game;
