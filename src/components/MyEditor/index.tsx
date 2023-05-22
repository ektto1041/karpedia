import { Editor, EditorContent, useEditor } from '@tiptap/react';
import styles from './MyEditor.module.css';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import { mdiFormatHeader1, mdiFormatHeader2, mdiFormatHeader3, mdiFormatHeader4, mdiFormatHeader5, mdiFormatHeader6 } from '@mdi/js';
import { mdiFormatAlignLeft, mdiFormatAlignRight, mdiFormatAlignCenter, mdiFormatAlignJustify } from '@mdi/js';
import { mdiFormatUnderline } from '@mdi/js';
import Icon from '@mdi/react';
import { useMemo } from 'react';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

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
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: '<p>hello</p>',
  }) as Editor;

  const menuList: (Menu | null)[][] = useMemo(() => [
    [
      { icon: mdiFormatAlignLeft, onClick: () => editor.chain().setTextAlign('left').run(), },
      { icon: mdiFormatAlignCenter, onClick: () => editor.chain().setTextAlign('center').run(), },
      { icon: mdiFormatAlignRight, onClick: () => editor.chain().setTextAlign('right').run(), },
      { icon: mdiFormatAlignJustify, onClick: () => editor.chain().setTextAlign('justify').run(), },
      null,
      { icon: mdiFormatHeader1, onClick: () => editor.chain().toggleHeading({ level: 1}).run(), },
      { icon: mdiFormatHeader2, onClick: () => editor.chain().toggleHeading({ level: 2}).run(), },
      { icon: mdiFormatHeader3, onClick: () => editor.chain().toggleHeading({ level: 3}).run(), },
      { icon: mdiFormatHeader4, onClick: () => editor.chain().toggleHeading({ level: 4}).run(), },
      { icon: mdiFormatHeader5, onClick: () => editor.chain().toggleHeading({ level: 5}).run(), },
      { icon: mdiFormatHeader6, onClick: () => editor.chain().toggleHeading({ level: 6}).run(), },
      null,
      { icon: mdiFormatUnderline, onClick: () => editor.chain().toggleUnderline().run(), },
    ],
  ], [editor]);

  return (
    <div className={styles.container} >
      <div className={styles['menu-bar']} >
        {menuList.map((menuLine, i) => (
          <div key={i} className={styles['menu-line']} >
            {menuLine.map((menu, j) => (
              menu !== null ?
              (
                <div key={j} className={styles['menu-item']} onClick={menu.onClick} >
                  <Icon path={menu.icon} size='100%' />
                </div>
              ) : (
                <div key={j} className={styles['menu-div']} />
              )
            ))}
          </div>
        ))}
      </div>
      
      <EditorContent editor={editor} />
    </div>
    
  );
};