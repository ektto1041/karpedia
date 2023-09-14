import { PostsDto } from '@/types/post';
import styles from './Content.module.css';
import MyEditor from '@/components/MyEditor';
import { ChaptersWithPostsDto } from '@/types/chapter';

type ContentProps = {
  post: PostsDto | ChaptersWithPostsDto;
};

export default function Content({
  post,
}: ContentProps) {
  const {title} = post;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content} >
        <MyEditor editable={false} defaultContent={post.content} onChangeContent={() => {}} />
      </div>
    </div>
  );
};