import Game, { Word } from "./component/Game";
import getFallback from "./component/getFallback";

const renderGame = (container: HTMLElement, words: Word[]): void => {
  try {
    const game = new Game(words);

    container.innerHTML = "";
    container.appendChild(game.rootElement);
  } catch (e) {
    container.innerHTML = getFallback(e);
  }
};

export default renderGame;
