import dynamic from "next/dynamic";
import { ChangeEvent, useCallback, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import styles from './NewPost.module.css';
import axios from "axios";
import strings from "@/utils/strings";
import { withWarning } from "@/utils/css";

type Content = string | undefined;

// TODO: dynamic 학습
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);
const MDViewer = dynamic(
  () => import("@uiw/react-markdown-preview"),
  { ssr: false }
);

export default function NewPostScreen() {
  const [emoji, setEmoji] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");

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

    const newPost = {
      emoji, title, content, topics: topic.split('|')
    };

    (async () => {
      const result = await axios.post('http://localhost:3000/api/posts', newPost);

      if(result.status === 200) {
        alert(strings.server.posts.addSuccess);

        setEmoji("");
        setTitle("");
        setContent("");
        setTopic("");
      } else {
        alert(strings.server.posts.addFail);
      }
    })();
  }, [title, content, topic]); 

  return (
    <div className={styles.container}>
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
      <MDEditor
        value={content}
        onChange={handleChangeContent}
        visiableDragbar={false}
        height={500}
        style={{ marginBottom: '10px' }}
      />
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
      <div className={styles.viewer} >
        <MDViewer source={content}></MDViewer>
      </div>
    </div>
  )
}