import Game, { Word } from "./Game";

function renderGame(container: HTMLElement, words: Word[]): Game | null {
  let game = null;

  try {
    game = new Game(container, words);
  } catch (e) {
    console.error(e);
    container.innerHTML = `
      <div class="error"> 
        <p><strong>다음과 같은 에러가 발생했습니다</strong></p>
        <p>${e.message}</p>
      </div>
    `;
  }

  return game;
}

export * from "./Game";
export default renderGame;
