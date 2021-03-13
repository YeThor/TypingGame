import Game, { Word } from "./component/Game";
import getFallback from "./component/getFallback";

const renderGame = (container: HTMLElement, words: Word[]): Game | null => {
  let game = null;

  try {
    game = new Game(words);

    container.innerHTML = "";
    container.appendChild(game.rootElement);
  } catch (e) {
    container.innerHTML = getFallback(e);
  }

  return game;
};

export default renderGame;
