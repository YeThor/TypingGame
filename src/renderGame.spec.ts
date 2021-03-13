import chai, { expect } from "chai";
import chaiDOM from "chai-dom";
import { Word } from "./component/Game";
import renderGame from "./renderGame";

chai.use(chaiDOM);

describe("renderGame() 테스트", () => {
  it("전달받은 container 엘리먼트에 Result 클래스의 rootElement를 붙인다", () => {
    // given
    const container = document.createElement("div");
    const words: Word[] = [{ second: 10, text: "abc" }];

    // when
    const game = renderGame(container, words);

    // then
    expect(game).not.empty;
    expect(container).contain(game!.rootElement);
  });
});
