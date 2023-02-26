import styles from './Topic.module.css';

type TopicProps = {
  children: string,
}

export default function Topic({
  children,
} : TopicProps) {
  return (
    <div className={styles.container}>
      {children} 
    </div>
  )
}