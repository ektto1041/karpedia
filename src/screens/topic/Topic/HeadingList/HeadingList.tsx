import styles from './HeadingList.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type Heading = {
  level: number
  text: string;
}

type HeadingListProps = {
  headingList: Heading[];
}

export default function HeadingList({
  headingList,
}: HeadingListProps) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <ul>
        {headingList?.map(h => (
          <li key={h.text} className={styles[`h${h.level}`]}>
            <Link href={`#${h.text.replaceAll(' ', '-')}`}>{h.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}