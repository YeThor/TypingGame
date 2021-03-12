import "../../styles/result.css";

export interface ResultData {
  score: number;
  average: number;
}

const renderResult = (container: HTMLElement, data: ResultData): void => {
  const { score = 0, average = 0 } = data;

  container.innerHTML = `
    <div class="result">
      <p class="greeting">Mission Complete!</p>
      <p class="score">당신의 점수는 ${score}점입니다</p>
      <p class="average">단어당 평균 답변 시간은 ${average}초입니다.</p>
      <button id='restart-btn' class="game-btn">다시 시작</button>
    </div>
  `;

  const restartButton = container.querySelector("#restart-btn");

  if (!restartButton) {
    console.error("No restart button");
    return;
  }

  restartButton.addEventListener("click", () => {
    window.location.hash = "";
  });
};

export default renderResult;
