import dynamic from "next/dynamic";
import { useState } from "react";
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
      <div className={styles.viewer} >
        <MDViewer source={value}></MDViewer>
      </div>
    </div>
  )
}