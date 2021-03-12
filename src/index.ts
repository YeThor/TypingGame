import renderGame, { Word } from "./component/Game";
import renderResult from "./component/Result";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("target");

  if (!container) {
    console.error("NO CONTAINER ELEMENT");
    return;
  }

  let words: Word[] = [];

  getWords().then((res: Word[]) => {
    words = res;
    renderGame(container, [{ second: 5, text: "a" }]);
  });

  window.addEventListener("hashchange", (): void => {
    const hash = window.location.hash;
    if (hash === "") {
      renderGame(container, words);
      /* 새 API 요청이 필요한 경우
      getWords().then((words: Word[]) => renderGame(container, words));
      */
    }

    if (hash.startsWith("#result")) {
      const { score = 0, average = 0 } = getHashParams(hash);

      renderResult(container, { score: +score, average: +average });
    }
  });
});

async function getWords(): Promise<Word[]> {
  let response = null;
  let responseJSON = null;

  try {
    response = await fetch(
      "https://my-json-server.typicode.com/kakaopay-fe/resources/words"
    );
    responseJSON = await response.json();
  } catch (e) {
    console.error(`API FAILED: ${e}`);
  }

  return responseJSON;
}

function getHashParams(hash: string): { [key: string]: string } {
  const params = hash.split("?")[1];

  return params
    ? params
        .split("&")
        .reduce((acc: { [key: string]: string }, param: string) => {
          const [key, value] = param.split("=");

          acc[key] = value;
          return acc;
        }, {})
    : {};
}
