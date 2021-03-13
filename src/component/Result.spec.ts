import { expect } from "chai";
import Result from "./Result";
import ERROR_TYPE from "../constant/ErrorType";

describe("Result 클래스", () => {
  it("전달받은 파라미터에서 score와 average 값을 저장한다", () => {
    // given
    const data = {
      score: 10,
      average: 20,
    };

    // when
    const result = new Result(data);

    // then
    expect(result.score).equal(data.score);
    expect(result.average).equal(data.average);
  });

  it("전달받은 파라미터에서 score나 average가 없으면 기본값으로 0을 가진다", () => {
    // given
    const invalidData = {};

    // when
    const result = new Result(invalidData);

    // then
    expect(result.score).equal(0);
    expect(result.score).equal(0);
  });

  it("rootElement는 score와 average를 표시하는 HTML 엘리먼트이다", () => {
    // given
    const data = {
      score: 10,
      average: 20,
    };
    const result = new Result(data);

    // when
    const rootElement = result.rootElement;

    // then
    expect(rootElement.querySelector(".score")?.textContent).equal(
      `당신의 점수는 ${data.score}점입니다`
    );
    expect(rootElement.querySelector(".average")?.textContent).equal(
      `단어당 평균 답변 시간은 ${data.average}초입니다.`
    );
  });

  it("createDOM()이 반환하는 엘리먼트에는 점수 및 시간 표시, 재시작을 위한 엘리먼트가 있다", () => {
    // given
    const result = new Result({ score: 10, average: 10 });

    // when
    const element = result.createDOM(10, 10);

    // then
    expect(element.querySelector(".score")).to.exist;
    expect(element.querySelector(".average")).to.exist;
    expect(element.querySelector("#restart-btn")).to.exist;
  });

  it("attachEvent()는 재시작 버튼에 url의 hash값을 ''로 할당하는 클릭 이벤트 리스너를 붙인다", () => {
    //given
    const result = new Result({ score: 10, average: 10 });
    const container = document.createElement("div");
    const restartButton = document.createElement("button");

    restartButton.id = "restart-btn";
    container.appendChild(restartButton);

    window.location.hash = "a";
    expect(window.location.hash).to.equal("#a");

    // when
    result.attachEvent(container);
    restartButton.click();

    // then
    expect(window.location.hash).to.equal("");
  });

  it("attachEvent()는 전달받은 엘리먼트에서 restart-btn id를 가진 버튼이 없을 경우 에러를 발생시킨다", () => {
    //given
    const result = new Result({ score: 10, average: 10 });
    const container = document.createElement("div");
    const restartButton = document.createElement("button");

    restartButton.id = "wrong-btn";
    container.appendChild(restartButton);

    // when, then
    expect(() => result.attachEvent(container)).to.throw(
      ERROR_TYPE.NO_SUCH_ELEMENT
    );
  });
});
