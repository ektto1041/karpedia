import styles from './PostSlide.module.css';
import Icon from '@mdi/react';
import { mdiKeyboardBackspace } from '@mdi/js';
import { useCallback } from 'react';
import { apis } from '@/utils/api';
import { useRouter } from 'next/router';
import { newPostsDto } from '@/types/post';
import { ChapterTitle, NewChaptersDto } from '@/types/chapter';
import PostEditor, { PostEditorResult, PostType } from '@/components/PostEditor/PostEditor';

type PostSlideProps = {
  chapters: ChapterTitle[];
  selectedType: PostType | null;
  onClickBackToType: () => void;
  topicId: number;
};

export default function PostSlide({
  chapters,
  selectedType,
  onClickBackToType,
  topicId,
}: PostSlideProps) {
  const router = useRouter();

  const onWrite = useCallback(async (data: PostEditorResult) => {
    const {chapterId, title, content} = data;
    if(!Boolean(chapterId)) {
      const newChapter: NewChaptersDto = { topicId, title, content };

      const response = await apis.createChapter(newChapter);
      if(response.status < 300) {
        await apis.revalidateTopicAfterCreate(topicId);
        router.push('/');
      }
    } else if(chapterId) {
      const newPost: newPostsDto = { chapterId, title, content };

      const response = await apis.createPost(newPost);
      if(response.status < 300) {
        await apis.revalidateTopicAfterCreate(topicId);
        router.push('/');
      }
    }
  }, [topicId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['back-button']} onClick={onClickBackToType}>
          <div className={styles.icon}>
            <Icon path={mdiKeyboardBackspace} />
          </div>
          돌아가기
        </div>
      </div>

      <PostEditor type={selectedType} chapters={chapters} onWrite={onWrite} />
    </div>
  );
};