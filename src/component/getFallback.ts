import "../styles/error.css";

const getFallback = (e: Error): string => {
  return `
  <div class="error"> 
    <p><strong>다음과 같은 에러가 발생했습니다</strong></p>
    <p>${e.message}</p>
  </div>
`;
};

export default getFallback;
