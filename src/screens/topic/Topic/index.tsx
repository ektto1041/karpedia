import ChapterList from './ChapterList/ChapterList';
import Content from './Content';
import styles from './Topic.module.css';
import { TopicsWithChaptersWithPostsDto } from "@/types/topic";
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ChapterOptions from './ChapterList/ChapterOptions';
import { TopicProps } from '@/pages/topic/[...id]';
import Icon from '@mdi/react';
import { mdiListBoxOutline } from '@mdi/js';
import css from '@/utils/css';
import CommentBox from './CommentBox';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import { apis } from '@/utils/api';
import { ChaptersWithPostsDto } from '@/types/chapter';

const findChapterIdByPostId = (topic: TopicsWithChaptersWithPostsDto, postId: number): number => {
  for(const chapter of topic.chaptersList) {
    for(const post of chapter.postsList) {
      if(post.id === postId) return chapter.id;
    }
  }

  return -1;
}

export default function TopicScreen({
  post,
  topicId,
  chapterId,
  postId,
}: TopicProps) {
  const [topic, setTopic] = useState<TopicsWithChaptersWithPostsDto | null>(null);
  const chapterList: ChaptersWithPostsDto[] = useMemo(() => {
    return topic ? topic.chaptersList.map(chapter => ({
      ...chapter,
      postsList: [...chapter.postsList].sort((a, b) => a.orders - b.orders),
    })).sort((a, b) => a.orders - b.orders) : [];
  }, [topic]);

  const [isMobileMenuClicked, setMoblieMenuClicked] = useState(false);

  const selfUser = useSelector((state: RootState) => selectSelfUser(state));
  const router = useRouter();

  const isOwner = useMemo(() => {
    return (selfUser && topic && selfUser.id === topic.users.id) ? true : false;
  }, [selfUser, topic]);

  const getTopic = useCallback(async () => {
    const response = await apis.getTopic(topicId);
    if(response.status < 300) {
      setTopic(response.data);
    }
  }, []);

  useEffect(() => {
    getTopic();
  }, []);

  useEffect(() => {
    setMoblieMenuClicked(false);
    document.body.classList.remove('mobile-chapter-list');
  }, [router])

  // 아래 두 메소드는 topic 이 truthy 일 때만 호출되므로 타입을 확정해줌
  const onClickChapter = (chapterId: number) => {
    router.push(`/topic/${topic!.id}/${chapterId}`);
  };

  const onClickPost = (postId: number) => {
    router.push(`/topic/${topic!.id}/${findChapterIdByPostId(topic!, postId)}/${postId}`);
  };

  const updateHref = useMemo(() => {
    return postId === -1 ? `/chapter/update?cid=${chapterId}` : `/post/update?pid=${postId}`;
  }, [postId, chapterId]);

  const onClickMobileMenu = useCallback(() => {
    setMoblieMenuClicked(!isMobileMenuClicked);

    if(!isMobileMenuClicked) {
      document.body.classList.add('mobile-chapter-list');
    } else {
      document.body.classList.remove('mobile-chapter-list');
    }
  }, [isMobileMenuClicked]);

  return (
    <div className={styles.container}>
      <div className={styles['mobile-menu-button-container']}>
        <div className={styles['mobile-menu-button']}  onClick={onClickMobileMenu}>
          <div className={styles['post-list-icon']}>
            <Icon path={mdiListBoxOutline} />
          </div>
          포스트 목록
        </div>
        <div className={css(styles['mobile-chapter-list-wrapper'], isMobileMenuClicked ? styles['clicked'] : '')}>
          {topic && (
            <ChapterList
              chapterList={chapterList}
              onClickChapter={onClickChapter}
              onClickPost={onClickPost}
              isOwner={isOwner}
              topicId={topic.id}
              chapterId={chapterId}
              postId={postId}
              updateHref={updateHref}
            />
          )}
        </div>
      </div>
      <div className={styles.content}>
        { post ? (
          <>
            { topic && (
              <div className={styles['chapter-list-wrapper']}>
                <ChapterList
                  chapterList={chapterList}
                  onClickChapter={onClickChapter}
                  onClickPost={onClickPost}
                  isOwner={isOwner}
                  topicId={topic.id}
                  chapterId={chapterId}
                  postId={postId}
                  updateHref={updateHref}
                />
              </div>
            )}
            
            <div className={styles.post}>
              <h3>{topic ? topic.name : ''}</h3>
              <Content post={post} />
              {postId != -1 && (
                <CommentBox
                  postId={postId}
                />
              )}
            </div>
          </>
        ) : (
          <div className={styles.warning}>
            <div className={styles.message}>
              작성된 포스트가 없습니다.
            </div>
            
            {isOwner && (<ChapterOptions topicId={topic!.id} updateHref={updateHref} />)}
          </div>
        )}
      </div>
    </div>
  );
};