import Game, { Word } from "./component/Game";
import Result from "./component/Result";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("target");

  if (!container) {
    return;
  }

  window.addEventListener("hashchange", (): void => {
    if (window.location.hash === "#") {
      fetch("https://my-json-server.typicode.com/kakaopay-fe/resources/words")
        .then((res: Response): Promise<Word[]> => res.json())
        .then((res: Word[]): void => {
          // @TODO: 라우터 구현하면서 개선해야함
          new Game(res, container);
        })
        .catch((e): void => {
          console.error(e);
        });
    }

    if (window.location.hash === "#result") {
      console.log("결과화면");
      // @TODO
      Result(container, 10, 4);
    }
  });

  fetch("https://my-json-server.typicode.com/kakaopay-fe/resources/words")
    .then((res: Response): Promise<Word[]> => res.json())
    .then((res: Word[]): void => {
      // @TODO: 라우터 구현하면서 개선해야함
      new Game(res, container);
    })
    .catch((e): void => {
      console.error(e);
    });
});
