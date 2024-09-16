const CHOSUNG_LIST = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

export function getChosung(str: string): string {
  return str
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0) - 44032;
      if (code > -1 && code < 11172) return CHOSUNG_LIST[Math.floor(code / 588)];
      return char;
    })
    .join("");
}

export function startsWithChosung(str: string, chosung: string): boolean {
  const strChosung = getChosung(str);
  return strChosung.startsWith(chosung);
}
