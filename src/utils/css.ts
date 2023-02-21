/**
 * 태그에 적용할 클래스 이름을 만들어주는 함수
 * @param classNames 적용할 클래스 이름 리스트
 * @returns 공백으로 구분된 클래스 이름 문자열
 */
export default function css(...classNames: string[]): string {
  return classNames.join(' ');
}

/**
 * 특정 값을 기준으로 warning을 표시하고 싶을 때, 클래스 이름을 만들어주는 함수
 * @param value warning을 표시하는 기준이 되는 값
 * @param classNames 적용할 클래스 이름 리스트
 * @returns 공백으로 구분된, warning이 적용된|되지 않은 클래스 이름 문자열
 */
export function withWarning(value: string, ...classNames: string[]): string {
  return `${classNames.join(' ')}${value ? '' : ' warning'}`;
}