import renderGame, { Word } from "./component/Game";
import renderResult from "./component/Result";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("target");

  if (!container) {
    console.error("NO CONTAINER ELEMENT");
    return;
  }

  window.location.hash = "";

  initGame(container);

  window.addEventListener("hashchange", (): void => {
    const hash = window.location.hash;
    if (hash === "") {
      initGame(container);
    }

    if (hash.startsWith("#result")) {
      const { score, average } = getHashParams(hash);

      renderResult(container, { score: +score, average: +average });
    }
  });
});

function initGame(container: HTMLElement): void {
  getWordsAPI()
    .then((res: Word[]): void => {
      renderGame(container, res);
    })
    .catch((e): void => {
      console.error(`API FAILED: ${e}`);
    });
}

function getWordsAPI(): Promise<Word[]> {
  return fetch(
    "https://my-json-server.typicode.com/kakaopay-fe/resources/words"
  ).then((res: Response): Promise<Word[]> => res.json());
}

function getHashParams(hash: string): { [key: string]: string } {
  const params = hash.split("?")[1];

  return params
    .split("&")
    .reduce((acc: { [key: string]: string }, param: string) => {
      const [key, value] = param.split("=");

      acc[key] = value;
      return acc;
    }, {});
}
