import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

const time = {
  now(): Timestamp {
    return Timestamp.now();
  },
  toString(timestamp: Timestamp): string {
    return dayjs(timestamp.toDate()).format();
  },
  toFormat(str: string, format: string = 'MMMM D, YYYY'): string {
    return dayjs(str).format(format);
  },
};

export default time;