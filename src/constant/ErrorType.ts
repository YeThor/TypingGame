// ENUM 사용 관련 이슈 @link  https://github.com/YeThor/TypingGame/issues/8

const ERROR_TYPE = {
  NO_SUCH_ELEMENT: "NO_SUCH_ELEMENT:  Some necessary Elements are missing",
  INVALID_ELEMENT_TYPE: "INVALID_ELEMENT_TYPE: Button or Input is missing",
  NO_WORDS: "NO_WORDS: There is no data",
};
type ERROR_TYPE = typeof ERROR_TYPE[keyof typeof ERROR_TYPE];

export default ERROR_TYPE;
