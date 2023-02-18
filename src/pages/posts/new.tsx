import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import styles from '../../styles/NewPost.module.css';

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

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [topic, setTopic] = useState("");

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (value: Content) => {
    setValue(value!);
  };

  const handleChangeTopic = (e: ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.title}
        type='text'
        value={title}
        onChange={handleChangeTitle}
        placeholder="제목을 입력해주세요."
      />
      <MDEditor
        value={value}
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
            type='text'
            placeholder="토픽을 입력해주세요."
            onChange={handleChangeTopic}
          />
        </div>
        <button className={styles['submit-button']}>작성</button>
      </div>
      <div style={{ marginTop: '50px' }}>{'<< 미리보기 >>'}</div>
      <div className={styles.viewer} >
        <MDViewer source={value}></MDViewer>
      </div>
    </div>
  )
}