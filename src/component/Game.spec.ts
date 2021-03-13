import chai, { expect } from "chai";
import chaiSpies from "chai-spies";
import Game, { Word } from "./Game";
import ERROR_TYPE from "../constant/ErrorType";

chai.use(chaiSpies);

describe("Game 클래스", () => {
  const words: Word[] = [{ second: 10, text: "abc" }];

  it("생성자에서 전달받은 단어를 멤버 변수로 가진다", () => {
    // given
    const game = new Game(words);

    // when, then
    expect(game.words).to.deep.equal(words);
  });

  it("rootElement 프로퍼티는 createDOM()에 의해 할당된다", () => {
    // given
    const game = new Game(words);
    const time = words[0].second;
    const score = words.length;

    // when, then
    expect(game.rootElement.outerHTML).equal(
      game.createDOM(time, score).outerHTML
    );
  });

  it("createDOM()은 시간과 남은 시간, 초기 단어를 표시하는 엘리먼트를 반환한다", () => {
    // given
    const game = new Game(words);
    const time = 10;
    const score = 5;

    // when
    const element = game.createDOM(time, score);

    // then
    expect(element).to.contain.text(`${time}`);
    expect(element).to.contain.text(`${score}`);
  });

  it("createDOM은 남은 시간, 점수, 입력창, 시작/초기화 버튼 요소를 포함한다", () => {
    // given
    const game = new Game(words);
    const time = 10;
    const score = 5;

    // when
    const element = game.createDOM(time, score);

    // when, then
    expect(element.querySelector("#time")).instanceOf(HTMLElement);
    expect(element.querySelector("#score")).instanceOf(HTMLElement);
    expect(element.querySelector("#word")).instanceOf(HTMLElement);

    expect(element.querySelector("#answer")).instanceOf(HTMLInputElement);
    expect(element.querySelector(".game-btn")).instanceOf(HTMLButtonElement);
  });

  it("mapElements()는 전달받은 엘리먼트로부터 필요한 하위요소들을 값으로 갖는 객체를 반환한다", () => {
    // given
    const game = new Game(words);
    const element = document.createElement("div");
    element.innerHTML = `
      <span class="display">남은 시간: <span id="time">10</span>초</span>
      <span class="display">점수: <span id="score">10</span>점</span>
      <div id="word">단어 표시</div>
      <div class="word-input">
        <input id="answer" type="text" disabled/>
      </div>
      <button class="game-btn" data-action="start">시작</button>
    `;

    // when
    const result = game.mapElements(element);

    // then
    expect(result).deep.equal({
      startButton: element.querySelector(".game-btn"),
      inputElement: element.querySelector("#answer"),
      scoreElement: element.querySelector("#score"),
      timeElement: element.querySelector("#time"),
      wordElement: element.querySelector("#word"),
    });
  });

  it("mapElements()가 전달받은 엘리먼트에 필요한 요소가 누락되어있을 경우 에러를 낸다", () => {
    // given
    const game = new Game(words);
    const element = document.createElement("div");

    // when, then
    expect(() => game.mapElements(element)).to.throw(
      ERROR_TYPE.NO_SUCH_ELEMENT
    );
  });

  it("mapElements()에서 추출한 input 엘리먼트가 실제 HTMLInputElement가 아닌 경우 에러를 낸다", () => {
    // given
    const game = new Game(words);
    const element = document.createElement("div");
    element.innerHTML = `
      <span class="display">남은 시간: <span id="time">10</span>초</span>
      <span class="display">점수: <span id="score">10</span>점</span>
      <div id="word">단어 표시</div>
      <div class="word-input">
        <div id="answer" type="text" disabled/>
      </div>
      <button class="game-btn" data-action="start">시작</button>
  `;

    // when, then
    expect(() => game.mapElements(element)).to.throw(
      ERROR_TYPE.INVALID_ELEMENT_TYPE
    );
  });

  it("mapElements()에서 추출한 버튼 엘리먼트가 실제 HTMLInputElement가 아닌 경우 에러를 낸다", () => {
    // given
    const game = new Game(words);
    const element = document.createElement("div");
    element.innerHTML = `
      <span class="display">남은 시간: <span id="time">10</span>초</span>
      <span class="display">점수: <span id="score">10</span>점</span>
      <div id="word">단어 표시</div>
      <div class="word-input">
        <input id="answer" type="text" disabled/> 
      </div>
      <div class="game-btn" data-action="start">시작</button>
  `;

    // when, then
    expect(() => game.mapElements(element)).to.throw(
      ERROR_TYPE.INVALID_ELEMENT_TYPE
    );
  });

  it("startGame()으로 게임이 시작될때 input창이 활성화된다", () => {
    // given
    const game = new Game(words);
    const input = game.rootElement.querySelector("input") as HTMLInputElement;

    expect(input.disabled).to.be.true;

    // when
    game.startGame();

    // then
    expect(input.disabled).to.be.false;
  });

  it("startGame()으로 게임이 시작될때 showWord()를 호출한다", () => {
    // given
    const game = new Game(words);
    const spyShowWord = chai.spy.on(game, "showWord");

    // when
    game.startGame();

    // then
    expect(spyShowWord).called.with(words[0]);
  });

  it("resetGame()은 점수, 시간을 초기화한다", () => {
    // given
    const words = [{ text: "kakaopay", second: 10 }];
    const game = new Game(words);
    const timeElement = game.rootElement.querySelector("#time") as HTMLElement;
    const scoreElement = game.rootElement.querySelector(
      "#score"
    ) as HTMLElement;

    timeElement.innerText = "wrong";
    scoreElement.innerText = "99";

    // when
    game.resetGame();

    // then
    expect(timeElement.innerText).equal(`${words[0].second}`);
    expect(scoreElement.innerText).equal(`${words.length}`);
  });

  it("showWord()는 전달받은 단어와 시간을 화면에 표시한다", () => {
    // given
    const game = new Game(words);

    // when
    game.showWord({ text: "kakaopay", second: 13 });

    const wordElement = game.rootElement.querySelector("#word") as HTMLElement;
    const timeElement = game.rootElement.querySelector("#time") as HTMLElement;

    // then
    expect(wordElement.innerText).equal("kakaopay");
    expect(timeElement.innerText).equal("13");
  });

  it("routeToResult()는 결과 페이지로 window.location.hash의 값을 #result?key=value&key2=value2 형태로 할당한다", () => {
    // given
    const game = new Game(words);
    const score = 100;
    const success = 10;
    const totalTime = 100;
    const average = (totalTime / success).toFixed(2);

    // when
    game.routeToResult(score, success, totalTime);

    // then
    expect(window.location.hash).equal(
      `#result?score=${score}&average=${average}`
    );
  });

  it("routeToResult()에서 성공 횟수 success가 0회이면 average의 값을 0을 반환한다", () => {
    // given
    const game = new Game(words);
    const score = 100;
    const totalTime = 100;
    const success = 0;

    expect(totalTime / success).equal(Infinity);

    // when
    game.routeToResult(score, success, totalTime);

    // then
    expect(window.location.hash).equal(`#result?score=${score}&average=${0}`);
  });

  describe("attachEvent()는 시작&초기화 버튼에 이벤트 리스너를 붙인다", () => {
    it("시작 버튼을 클릭하면 초기화 버튼으로 변한다", () => {
      // given
      const game = new Game(words);
      const button = game.rootElement.querySelector(
        ".game-btn"
      ) as HTMLButtonElement;

      expect(button).have.text("시작");
      expect(button.dataset.action).equal("start");

      // when
      button.click();

      // then
      expect(button.innerText).equal("초기화");
      expect(button.dataset.action).equal("resume");
    });

    it("시작 버튼을 클릭하면 startGame()을 1회 호출하여 게임을 시작한다", () => {
      // given
      const game = new Game(words);
      const button = game.rootElement.querySelector(
        ".game-btn"
      ) as HTMLButtonElement;
      const spyStartGame = chai.spy.on(game, "startGame");

      // when
      button.click();

      // then
      expect(spyStartGame).called.once;
    });

    it("초기화 버튼을 클릭하면 시작 버튼으로 변한다", () => {
      // given
      const game = new Game(words);
      const button = game.rootElement.querySelector(
        ".game-btn"
      ) as HTMLButtonElement;

      button.click();

      expect(button.innerText).equal("초기화");
      expect(button.dataset.action).equal("resume");

      // when
      button.click();

      // then
      expect(button.innerText).equal("시작");
      expect(button.dataset.action).equal("start");
    });

    it("초기화 버튼을 클릭하면 resetGame()을 1회 호출하여 게임을 시작한다", () => {
      // given
      const game = new Game(words);
      const button = game.rootElement.querySelector(
        ".game-btn"
      ) as HTMLButtonElement;
      const spyResetGame = chai.spy.on(game, "resetGame");

      button.click();

      // when
      button.click();

      // then
      expect(spyResetGame).called.once;
    });

    it("input에서 엔터키를 입력했을 때 입력값과 단어가 일치하면 clearWord를 1회 호출한다", (done) => {
      // given
      const game = new Game([{ text: "abc", second: 10 }]);
      const spyClearWord = chai.spy.on(game, "clearWord");
      const input = game.rootElement.querySelector("input") as HTMLInputElement;

      // when
      input.value = "abc";
      input.addEventListener("keypress", () => {
        // then
        expect(spyClearWord).called.once;
        done();
      });
      input.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));
    });

    it("input에서 엔터키를 입력했을 때 input창을 비운다", (done) => {
      // given
      const game = new Game([{ text: "abc", second: 10 }]);
      const input = game.rootElement.querySelector("input") as HTMLInputElement;

      // when
      input.value = "abc";
      input.addEventListener("keypress", () => {
        // then
        expect(input.value).equal("");
        done();
      });
      input.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));
    });
  });
});
