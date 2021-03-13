import ERROR_TYPE from "../constant/ErrorType";
import "../styles/result.css";

export interface ResultData {
  score?: number;
  average?: number;
}

const Result = (data: ResultData): HTMLElement => {
  const { score = 0, average = 0 } = data;
  const rootElement = document.createElement("div");

  rootElement.classList.add("result");
  rootElement.innerHTML = `
    <p class="greeting">Mission Complete!</p>
    <p class="score">당신의 점수는 ${score}점입니다</p>
    <p class="average">단어당 평균 답변 시간은 ${average}초입니다.</p>
    <button id='restart-btn' class="game-btn">다시 시작</button>
  `;

  const restartButton = rootElement.querySelector("#restart-btn");

  if (!restartButton) throw new Error(ERROR_TYPE.NO_SUCH_ELEMENT);

  restartButton.addEventListener("click", () => {
    window.location.hash = "";
  });

  return rootElement;
};

export default Result;
