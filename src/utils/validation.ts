// 이메일 유효성 검사
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// 비밀번호 유효성 검사 (10자 이상, 대소문자+숫자+특수문자 포함)
export const isValidPassword = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/.test(password);

// 비밀번호 확인 (일치 여부)
export const isPasswordMatch = (
  password: string,
  passwordCheck: string,
): boolean => password === passwordCheck;

// 닉네임 유효성 검사 (1~10자)
export const isValidNickName = (nickName: string): boolean =>
  nickName.length > 0 && nickName.length <= 10;
