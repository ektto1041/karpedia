import dayjs from "dayjs";
import 'dayjs/locale/ko';

const time = {
  /**
   * Date -> String
   * @param timestamp 문자열로 변환하려는 Timestamp
   * @returns 기본 포맷 문자열로 변환된 Timestamp
   */
  toString(date: Date): string {
    return dayjs(date).format();
  },
  /**
   * @param str 문자열로 저장된 시간 데이터
   * @param format 적용하려는 포맷(dayjs 포맷을 따름). 미입력시 'MMMM D, YYYY'
   * @returns 포맷이 적용된 문자열
   */
  toFormat(str: string, format: string = 'MMMM D, YYYY'): string {
    return dayjs(str).locale('ko').format(format);
  },
  /**
   * 기본 포맷 문자열로 저장되어있는 두 시간을 비교하여 결과를 반환해주는 함수
   * @param a 기본 포맷 문자열로 저장된 시간
   * @param b 기본 포맷 문자열로 저장된 시간
   * @returns a 가 더 최신이면 -1, 그렇지 않으면 1
   */
  compare(a: string, b: string): number {
    if(dayjs(a).isAfter(b)) return -1;
    else return 1;
  }
};

export default time;