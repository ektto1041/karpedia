import { Editor, EditorContent, useEditor } from '@tiptap/react';
import styles from './MyEditor.module.css';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import { mdiFormatHeader1, mdiFormatHeader2 } from '@mdi/js';
import Icon from '@mdi/react';
import { useMemo } from 'react';

type Menu = {
  icon: string;
  onClick: () => void;
};

export default function MyEditor() {
  const editor = useEditor({
    extensions: [
      Document,   // 필수
      Paragraph,
      Text,
      Heading,    // H1, H2, ...
    ],
    content: '<p>hello</p>',
  }) as Editor;

  const menuList: Menu[][] = useMemo(() => [
    [
      { icon: mdiFormatHeader1, onClick: () => editor.chain().toggleHeading({ level: 1}).run(), },
      { icon: mdiFormatHeader2, onClick: () => editor.chain().toggleHeading({ level: 2}).run(), },
    ],
  ], [editor]);

  return (
    <div className={styles.container} >
      <div className={styles['menu-bar']} >
        {menuList.map((menuLine, i) => (
          <div key={i} className={styles['menu-line']} >
            {menuLine.map((menu, j) => (
              <div key={j} className={styles['menu-item']} onClick={menu.onClick} >
                <Icon path={menu.icon} size='100%' />
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <EditorContent editor={editor} />
    </div>
    
  );
};