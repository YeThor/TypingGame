import ERROR_TYPE from "../constant/ErrorType";
import "../styles/result.css";

export interface ResultData {
  score?: number;
  average?: number;
}

class Result {
  score: number;
  average: number;
  private _rootElement: HTMLElement;

  constructor(data: ResultData) {
    const { score = 0, average = 0 } = data;

    this.score = score;
    this.average = average;
    this._rootElement = this.createDOM(this.score, this.average);
    this.attachEvent(this._rootElement);
  }

  get rootElement(): HTMLElement {
    return this._rootElement;
  }

  createDOM = (score: number, average: number): HTMLElement => {
    const rootElement = document.createElement("div");

    rootElement.classList.add("result");
    rootElement.innerHTML = `
    <p id="greeting">Mission Complete!</p>
    <p id="score">당신의 점수는 ${score}점입니다</p>
    <p id="average">단어당 평균 답변 시간은 ${average}초입니다.</p>
    <button>다시 시작</button>
  `;

    return rootElement;
  };

  attachEvent = (rootElement: HTMLElement): void => {
    const restartButton = rootElement.querySelector("button");

    if (!restartButton) throw new Error(ERROR_TYPE.NO_SUCH_ELEMENT);

    restartButton.addEventListener("click", () => {
      window.location.hash = "";
    });
  };
}

export default Result;
