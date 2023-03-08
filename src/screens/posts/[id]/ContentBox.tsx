import dynamic from 'next/dynamic';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import styles from './ContentBox.module.css';

type ContentBoxProps = {
  content: string,
};

const MDViewer = dynamic(
  () => import("@uiw/react-markdown-preview"),
  { ssr: false }
);

export default function ContentBox({
  content,
}: ContentBoxProps) {
  return (
    <div className={styles.container} >
      <MDViewer source={content}></MDViewer>
    </div>
  )
};