import dynamic from "next/dynamic";
import { useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import styles from '../styles/posting.module.css';

type Content = string | undefined;

// 지연 로딩을 통해 퍼포먼스 향상
// TODO: dynamic 학습
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export default function Posting() {
  const [value, setValue] = useState("");

  const handleChangeContent = (value: Content) => {
    setValue(value!);
  }

  return (
    <div className={styles.container}>
      <MDEditor
        value={value}
        onChange={handleChangeContent}
      />
    </div>
  )
}