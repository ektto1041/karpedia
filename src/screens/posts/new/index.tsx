import dynamic from "next/dynamic";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from './NewPost.module.css';
import strings from "@/utils/strings";
import { withWarning } from "@/utils/css";
import { CreatePostDto, PostsEntity } from "@/types/post";
import { apis } from "@/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MyEditor from "@/components/MyEditor/";

type Content = string | undefined;

// TODO: dynamic 학습

export default function NewPostScreen() {
  const router = useRouter();
  const session = useSession();

  // 포스트 업데이트 시 쿼리스트링으로 넘어오는 postId
  const postId = router.query.postId ? Number(router.query.postId as string) : undefined;
  // 로그인 시 true
  const isAdmin = Boolean(session.status === 'authenticated');

  const [isValidPostId, setValidPostId] = useState(true);

  const [emoji, setEmoji] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");

  const getPostById = async () => {
    if(postId) {
      const result = await apis.getPostById(postId);

      if(result.status === 200) {
        const post = result.data;

        console.log(post);

        setEmoji(post.emoji);
        setTitle(post.title);
        setContent(post.content);
        setTopic(post.topics.map(t => t.name).join('|'));
      } else {
        setValidPostId(false);
      }
    }
  }

  useEffect(() => {
    getPostById();
  }, [router]);

  const handleChangeEmoji = (e: ChangeEvent<HTMLInputElement>) => {
    setEmoji(e.target.value);
  }; 

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (value: Content) => {
    setContent(value!);
  };

  const handleChangeTopic = (e: ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const handleSubmit = useCallback(() => {
    if(!(emoji && title && content && topic)) {
      alert(strings.page.alert.required);
      return;
    }    

    const newPost: CreatePostDto = {
      emoji, title, content, topics: topic.split('|')
    };

    (async () => {
      const result = postId ?
        await apis.updatePost(newPost, postId) :
        await apis.createPost(newPost);
      
      const pId = postId || result.data.id;

      console.log(result.data);

      if(result.status >= 200 && result.status < 300) {
        alert(strings.server.posts.addSuccess);

        setEmoji("");
        setTitle("");
        setContent("");
        setTopic("");

        const revalidationResult = await apis.revalidatePost(pId);
        if(revalidationResult.status !== 200) {
          alert('revalidation failed');
        }
      } else {
        alert(strings.server.posts.addFail);
      }
    })();
  }, [title, content, topic]); 

  return (
    <div className={styles.container}>
      {isAdmin && isValidPostId ? (
        <>
          <input
            className={withWarning(emoji, styles.emoji)}
            type='text'
            value={emoji}
            onChange={handleChangeEmoji}
            placeholder={'😀'}
          />
          <input
            className={withWarning(title, styles.title)}
            type='text'
            value={title}
            onChange={handleChangeTitle}
            placeholder={strings.page.ph.title}
          />
          <MyEditor />
          <div className={styles['button-box']}>
            <div className={styles.topic}>
              <div className={styles.label}>
                토픽:
              </div>
              <input
                className={withWarning(topic)}
                type='text'
                placeholder={strings.page.ph.topic}
                value={topic}
                onChange={handleChangeTopic}
              />
            </div>
            <button className={styles['submit-button']} onClick={handleSubmit}>작성</button>
          </div>
          <div style={{ marginTop: '50px' }}>{'<< 미리보기 >>'}</div>
          {/* <div className={styles.viewer} >
            <MDViewer source={content}></MDViewer>
          </div> */}
        </>
      ) : (<></>)}
    </div>
  )
}