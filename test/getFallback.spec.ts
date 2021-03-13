import { expect } from "chai";
import getFallback, { template } from "../src/component/getFallback";

describe("getFallback() 테스트", () => {
  it("에러객체의 message 프로퍼티를 담은 템플릿을 반환한다 ", () => {
    // given
    const error = new Error("123");

    // when
    const result = getFallback(error);

    // then
    expect(result).to.equal(template(error.message));
  });
});
