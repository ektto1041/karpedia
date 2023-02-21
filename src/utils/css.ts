export default function css(...classNames: string[]): string {
  return classNames.join(' ');
}

export function withWarning(value: string, ...classNames: string[]): string {
  return `${classNames.join(' ')}${value || ' warning'}`;
}