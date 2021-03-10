import Game, { Word } from "./component/Game";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");

  if (!container) {
    return;
  }

  fetch("https://my-json-server.typicode.com/kakaopay-fe/resources/words")
    .then((res: Response): Promise<Word[]> => res.json())
    .then((res: Word[]): void => {
      // @TODO: 라우터 구현하면서 개선해야함
      new Game(res);
    })
    .catch((e): void => {
      console.error(e);
    });
});
