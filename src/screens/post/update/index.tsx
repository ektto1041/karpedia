import { useRouter } from 'next/router';
import styles from './UpdatePost.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apis } from '@/utils/api';
import { ChaptersTitleDto } from '@/types/chapter';
import { NewPostsUpdateDto, PostsWithChaptersIdDto } from '@/types/post';
import PostEditor, { PostEditorResult } from '@/components/PostEditor/PostEditor';
import Dropdown from '@/components/Dropdown/Dropdown';

export default function UpdatePostScreen() {
  const router = useRouter();
  const postId: number | undefined = useMemo(() => 
    (router.query.pid ? parseInt(router.query.pid as string) : undefined)
  , [router]);

  const [chapters, setChapters] = useState<ChaptersTitleDto[]>([]);
  const [post, setPost] = useState<PostsWithChaptersIdDto>();
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);

  const getUpdatePostData = useCallback(async (postId: number) => {
    const response = await apis.getUpdatePost(postId);
    if(response.status < 300) {
      const data = response.data;
      setChapters(data.chaptersList);
      setPost(data.posts);
      const defaultSelectedChapterIdx = data.chaptersList.findIndex(c => c.id === data.posts.chaptersId);
      setSelectedChapterIdx(defaultSelectedChapterIdx);
    }
  }, []);

  useEffect(() => {
    if(postId) {
      getUpdatePostData(postId);
    }
  }, [postId]);

  const onChangeChapter = useCallback((value: number) => {
    setSelectedChapterIdx(value);
  }, []);

  const onWrite = useCallback(async (data: PostEditorResult) => {
    const newPost: NewPostsUpdateDto = {
      id: post!.id,
      title: data.title,
      content: data.content,
      chapterId: chapters[selectedChapterIdx].id,
    };

    const response = await apis.updatePost(newPost);
    if(response.status < 300) {
      router.push('/');
    }
  }, [post, router, chapters, selectedChapterIdx]);
  
  return (
    <div className={styles.container}>
      <h1>포스트 수정</h1>
      {post ? (
        <>
          <Dropdown data={chapters.map(c => ({ id: c.id, title: c.title }))} value={selectedChapterIdx} onChange={onChangeChapter}  />
          <PostEditor
            onWrite={onWrite}
            defaultTitle={post.title}
            defaultContent={post.content}
          />
        </>
      ) : (<></>)}
    </div>
  );
};