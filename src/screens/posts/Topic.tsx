import css from '@/utils/css';
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
  return (
    <div className={css(styles.container, selected ? styles.selected : '')} onClick={() => onClick(children)}>
      {children}
    </div>
  )
}