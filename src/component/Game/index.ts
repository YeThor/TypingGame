import Game, { Word } from "./Game";

function renderGame(container: HTMLElement, words: Word[]): void {
  try {
    const game = new Game(words);

    container.innerHTML = "";
    container.append(game.rootElement);
  } catch (e) {
    console.error(e);
    container.innerHTML = `
      <div class="error"> 
        <p><strong>다음과 같은 에러가 발생했습니다</strong></p>
        <p>${e.message}</p>
      </div>
    `;
  }
}

export * from "./Game";
export default renderGame;
