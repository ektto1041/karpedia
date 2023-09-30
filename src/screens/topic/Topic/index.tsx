
import { PostsDto } from '@/types/post';
import ChapterList from './ChapterList/ChapterList';
import Content from './Content';
import styles from './Topic.module.css';
import { TopicsWithChaptersWithPostsDto } from "@/types/topic";
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ChapterOptions from './ChapterList/ChapterOptions';
import { ChaptersWithPostsDto } from '@/types/chapter';
import { TopicProps } from '@/pages/topic/[...id]';
import Icon from '@mdi/react';
import { mdiListBoxOutline } from '@mdi/js';
import css from '@/utils/css';
import CommentBox from './CommentBox';
import { apis } from '@/utils/api';
import { NewCommentsDto } from '@/types/comment';

const findPost = (topic: TopicsWithChaptersWithPostsDto, chapterId: number, postId: number): PostsDto | ChaptersWithPostsDto => {
  const chapter: ChaptersWithPostsDto = topic.chaptersList.find(c => c.id === chapterId)!;
  if(postId > -1) {
    const post: PostsDto = chapter.postsList.find(p => p.id === postId)!;

    return post;
  }

  return chapter;
}

const findChapterIdByPostId = (topic: TopicsWithChaptersWithPostsDto, postId: number): number => {
  for(const chapter of topic.chaptersList) {
    for(const post of chapter.postsList) {
      if(post.id === postId) return chapter.id;
    }
  }

  return -1;
}

export default function TopicScreen({
  topic,
  chapterId,
  postId,
}: TopicProps) {
  const {id, name, description, chaptersList, users} = topic
  const post = chapterId !== -1 ? findPost(topic, chapterId, postId) : null;

  const [isOwner, setOwner] = useState(false);
  const [isMobileMenuClicked, setMoblieMenuClicked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setOwner(getCookie('uid') === String(users.id));
  }, []);

  useEffect(() => {
    setMoblieMenuClicked(false);
    document.body.classList.remove('mobile-chapter-list');
  }, [router])

  const onClickChapter = (chapterId: number) => {
    router.push(`/topic/${topic.id}/${chapterId}`);
  };

  const onClickPost = (postId: number) => {
    router.push(`/topic/${topic.id}/${findChapterIdByPostId(topic, postId)}/${postId}`);
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

  const onClickCreateComment = useCallback(async (content: string) => {
    const newComment: NewCommentsDto = {
      content,
      postsId: postId,
    }

    const response = await apis.createComment(newComment);
    if(response.status < 300) {
      router.reload();
    }
  }, [postId, router]);

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
          <ChapterList
            chapterList={chaptersList}
            onClickChapter={onClickChapter}
            onClickPost={onClickPost}
            isOwner={isOwner}
            topicId={id}
            chapterId={chapterId}
            postId={postId}
            updateHref={updateHref}
          />
        </div>
      </div>
      <div className={styles.content}>
        { post ? (
          <>
            <div className={styles['chapter-list-wrapper']}>
              <ChapterList
                chapterList={chaptersList}
                onClickChapter={onClickChapter}
                onClickPost={onClickPost}
                isOwner={isOwner}
                topicId={id}
                chapterId={chapterId}
                postId={postId}
                updateHref={updateHref}
              />
            </div>
            <div className={styles.post}>
              <h3>{topic.name}</h3>
              <Content post={post} />
              {postId != -1 && (
                <CommentBox
                  onClickCreateComment={onClickCreateComment}
                  viewer={users}
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
            
            {isOwner && (<ChapterOptions topicId={id} updateHref={updateHref} />)}
          </div>
        )}
      </div>
    </div>
  );
};