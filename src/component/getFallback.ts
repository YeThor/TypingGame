import "../styles/error.css";

export const template = (data: string): string => `
<div class="error"> 
  <p><strong>다음과 같은 에러가 발생했습니다</strong></p>
  <p id="message">${data}</p>
</div>
`;

const getFallback = (e: Error): string => {
  return template(e.message);
};

export default getFallback;
