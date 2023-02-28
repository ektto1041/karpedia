import css from '@/utils/css';
import { useCallback } from 'react';
import styles from './Topic.module.css';

type TopicProps = {
  children: string,
  selected: boolean,
  onClick: (topicName: string) => void,
}

export default function Topic({
  children,
  selected,
  onClick,
} : TopicProps) {
  const handleClick = useCallback(() => {
    onClick(children);
  }, [onClick, children]);

  return (
    <div
      className={css(styles.container, selected ? styles.selected : '')}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}