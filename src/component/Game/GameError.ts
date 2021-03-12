// ENUM 사용 관련 이슈 @link  https://github.com/YeThor/TypingGame/issues/8

const GAME_ERROR = {
  NO_SUCH_ELEMENT: " Some necessary Elements are missing",
  INVALID_ELEMENT_TYPE: " Button or Input is missing",
  NO_WORDS: "There is no data",
};
type GAME_ERROR = typeof GAME_ERROR[keyof typeof GAME_ERROR];

export default GAME_ERROR;
