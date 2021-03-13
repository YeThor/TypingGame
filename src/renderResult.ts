import Result, { ResultData } from "./component/Result";
import getFallback from "./component/getFallback";

const renderResult = (
  container: HTMLElement,
  data: ResultData
): Result | null => {
  let result = null;

  try {
    result = new Result(data);

    container.innerHTML = "";
    container.appendChild(result.rootElement);
  } catch (e) {
    container.innerHTML = getFallback(e);
  }

  return result;
};

export default renderResult;
