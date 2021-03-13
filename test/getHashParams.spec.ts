import { expect } from "chai";
import getHashParams from "../src/getHashParams";

describe("getHashParams() 테스트", () => {
  it("hash로 전달된 문자열에서 ?key=value&key=value 형태로 전달된 파라미터 문자열을 객체로 바꾼다", () => {
    // given
    const params = "www.hello.com/#user?name=kim&age=20";

    // when
    const result = getHashParams(params);

    // then
    expect(result).to.deep.equal({ name: "kim", age: "20" });
  });

  it("유효한 파라미터가 없으면 빈 객체를 리턴한다", () => {
    // given
    const params = "www.hello.com/#user";

    // when
    const result = getHashParams(params);

    // then
    expect(result).to.be.empty;
  });
});
