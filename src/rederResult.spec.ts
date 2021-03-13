import chai, { expect } from "chai";
import chaiDOM from "chai-dom";
import renderResult from "./renderResult";

chai.use(chaiDOM);

describe("renderResult() 테스트", () => {
  it("전달받은 container 엘리먼트에 Result 클래스의 rootElement를 붙인다", () => {
    // given
    const container = document.createElement("div");

    // when
    const result = renderResult(container, { score: 10, average: 10 });

    // then
    expect(result).not.empty;
    expect(container).contain(result!.rootElement);
  });
});
