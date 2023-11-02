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
import HeadingList, { Heading } from './HeadingList/HeadingList';

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

  const [headingArch, setHeadingArch] = useState<Heading[]>([]);

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
    if(post) {
      const htmlContent = document.querySelector('div.post-editor');
      if(htmlContent) {
        const children = htmlContent.children;

        const newHeadingArch: Heading[] = [];

        for(let i=0; i<children.length; i++) {
          const child = children[i];
          const tagName = child.tagName;

          // id 속성이 없으면 제외
          if(child.getAttribute('id')) {
            if(tagName === 'H1') {
              newHeadingArch.push({
                level: 1,
                text: child.textContent || '',
              });
            } else if(tagName === 'H2') {
              newHeadingArch.push({
                level: 2,
                text: child.textContent || '',
              });
            } else if(tagName === 'H3') {
              newHeadingArch.push({
                level: 3,
                text: child.textContent || '',
              });
            }
          }
        }

        setHeadingArch(newHeadingArch);
      }
    }
  }, [post]);

  useEffect(() => {
    setMoblieMenuClicked(false);
    document.body.classList.remove('mobile-chapter-list');
  }, [router]);

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
    <main className={styles.container}>
      <div className={styles['mobile-menu-button-container']}>
        <button className={styles['mobile-menu-button']}  onClick={onClickMobileMenu}>
          <div className={styles['post-list-icon']}>
            <Icon path={mdiListBoxOutline} />
          </div>
          포스트 목록
        </button>
        <div className={css(styles['mobile-chapter-list-wrapper'], isMobileMenuClicked ? styles['clicked'] : '')}>
          {topic && (
            <ChapterList
              chapterList={chapterList}
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
              <aside className={styles['chapter-list-wrapper']}>
                <ChapterList
                  chapterList={chapterList}
                  isOwner={isOwner}
                  topicId={topic.id}
                  chapterId={chapterId}
                  postId={postId}
                  updateHref={updateHref}
                />
              </aside>
            )}
            
            <article className={styles.post}>
              <h3>{topic ? topic.name : ''}</h3>
              <Content post={post} />
              {postId != -1 && (
                <CommentBox
                  postId={postId}
                />
              )}
            </article>

            <aside className={styles['heading-list-wrapper']}>
              <HeadingList headingList={headingArch} />
            </aside>
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
    </main>
  );
};