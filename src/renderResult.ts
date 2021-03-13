import Result, { ResultData } from "./component/Result";
import getFallback from "./component/getFallback";

const renderResult = (container: HTMLElement, data: ResultData): void => {
  try {
    const resultElement = Result(data);

    container.innerHTML = "";
    container.appendChild(resultElement);
  } catch (e) {
    container.innerHTML = getFallback(e);
  }
};

export default renderResult;
