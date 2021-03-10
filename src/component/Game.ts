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

  constructor(words: Word[]) {
    this.words = words.reverse();
    this.totalScore = words.length;
    this.time = words[words.length - 1].second;

    const scoreElement = document.getElementById("score");
    const timeElement = document.getElementById("time");
    const startButton = document.getElementById("start");

    if (!scoreElement || !timeElement || !startButton) return;

    document.querySelector(".top")?.classList.add("visible");

    scoreElement.innerText = `점수: ${this.totalScore}점`;
    timeElement.innerText = `남은 시간: ${this.time}초`;

    startButton.addEventListener("click", (): void => {
      const action = startButton.dataset.action;

      switch (action) {
        case "start":
          startButton.innerText = `초기화`;
          startButton.dataset.action = "resume";
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
  }

  startGame = (): void => {
    const scoreElement = document.getElementById("score");
    const timeElement = document.getElementById("time");
    const startButton = document.getElementById("start");
    const inputElement = document.getElementById("answer") as HTMLInputElement;

    if (!scoreElement || !timeElement || !startButton || !inputElement) return;

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
    const startButton = document.getElementById("start");
    const inputElement = document.getElementById("answer");
    const wordElement = document.getElementById("word");

    if (
      !scoreElement ||
      !timeElement ||
      !startButton ||
      !inputElement ||
      !wordElement
    )
      return;

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
    const startButton = document.getElementById("start");

    if (!scoreElement || !timeElement || !startButton) return;

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
      return;
    }

    this.showWord(word);
  };
}

export default Game;
