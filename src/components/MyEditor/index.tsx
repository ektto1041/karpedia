import { Editor, EditorContent, useEditor } from '@tiptap/react';
import styles from './MyEditor.module.css';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import { mdiFormatHeader1, mdiFormatHeader2, mdiFormatHeader3, mdiFormatHeader4, mdiFormatHeader5, mdiFormatHeader6, mdiFormatAlignLeft, mdiFormatAlignRight, mdiFormatAlignCenter, mdiFormatAlignJustify } from '@mdi/js';
import { mdiFormatUnderline, mdiFormatStrikethrough, mdiFormatItalic, mdiFormatBold } from '@mdi/js';
import { mdiLinkVariant, mdiImage } from '@mdi/js';
import { mdiFormatListNumbered, mdiFormatListBulleted } from '@mdi/js';
import { mdiAlphaABoxOutline, mdiAlphaABox } from '@mdi/js';
import { mdiMinus, mdiFormatQuoteOpen } from '@mdi/js';
import { mdiCodeBraces, mdiCodeBracesBox } from '@mdi/js';
import Icon from '@mdi/react';
import { use, useCallback, useMemo } from 'react';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Link from '@tiptap/extension-link';
import Italic from '@tiptap/extension-italic';
import Image from '@tiptap/extension-image';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import History from '@tiptap/extension-history';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Blockquote from '@tiptap/extension-blockquote';

type Menu = {
  icon: string;
  color?: string;
  onClick: () => void;
};

type MyEditorProps = {
  onChangeContent: (value: string) => void;
  defaultContent: string;
  editable: boolean;
};

export default function MyEditor({
  onChangeContent,
  defaultContent,
  editable,
}: MyEditorProps) {
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
      Strike,
      OrderedList,
      ListItem,
      Link.configure({
        HTMLAttributes: {
          rel: 'noopener noreferrer',
        }
      }),
      Italic,
      Image,
      HorizontalRule,
      History,
      //Highlight,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Code,
      CodeBlock,
      Bold,
      BulletList,
      Blockquote,
    ],
    onUpdate: (p) => onChangeContent(p.editor.getHTML()),
    content: defaultContent,
    editable,
  }) as Editor;

  const setLink = useCallback(() => {
    const url = prompt('URL 을 입력해주세요.');
    if(url === null) return;
    editor.commands.setLink({ href: url });
  }, [editor]);

  const setImage = useCallback(() => {
    const url = prompt('URL 을 입력해주세요.');
    if(url === null) return;
    editor.commands.setImage({ src: url });
  }, [editor]);

  const setColor = useCallback((color: string) => {
    editor.commands.setColor(color);
  }, [editor]);

  const setHighlight = useCallback((color: string) => {
    editor.commands.setHighlight({ color });
  }, [editor]);

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
      { icon: mdiFormatBold, onClick: () => editor.commands.toggleBold(), },
      { icon: mdiFormatUnderline, onClick: () => editor.commands.toggleUnderline(), },
      { icon: mdiFormatStrikethrough, onClick: () => editor.commands.toggleStrike(), },
      { icon: mdiFormatItalic, onClick: () => editor.commands.toggleItalic(), },
      { icon: mdiCodeBraces, onClick: () => editor.commands.toggleCode(), },
      { icon: mdiCodeBracesBox, onClick: () => editor.commands.toggleCodeBlock(), },
      null,
      { icon: mdiLinkVariant, onClick: () => setLink(), },
      { icon: mdiImage, onClick: () => setImage(), },
    ],
    [ 
      { icon: mdiAlphaABoxOutline, color: '#111111', onClick: () => setColor('#111111'), },
      { icon: mdiAlphaABoxOutline, color: 'red', onClick: () => setColor('red'), },
      { icon: mdiAlphaABoxOutline, color: 'blue', onClick: () => setColor('blue'), },
      { icon: mdiAlphaABoxOutline, color: 'green', onClick: () => setColor('green'), },
      null,
      { icon: mdiAlphaABox, color: '#111111', onClick: () => setHighlight('white'), },
      { icon: mdiAlphaABox, color: 'red', onClick: () => setHighlight('red'), },
      { icon: mdiAlphaABox, color: 'blue', onClick: () => setHighlight('blue'), },
      { icon: mdiAlphaABox, color: 'green', onClick: () => setHighlight('green'), },
    ],
    [
      { icon: mdiFormatListNumbered, onClick: () => editor.commands.toggleOrderedList(), },
      { icon: mdiFormatListBulleted, onClick: () => editor.commands.toggleBulletList(), },
      null,
      { icon: mdiMinus, onClick: () => editor.commands.setHorizontalRule(), },
      { icon: mdiFormatQuoteOpen, onClick: () => editor.commands.toggleBlockquote(), },
    ]
  ], [editor, setLink, setImage, setColor, setHighlight]);

  return (
    <div className={styles.container} >
      {editable && (
        <div className={styles['menu-bar']} >
          {menuList.map((menuLine, i) => (
            <div key={i} className={styles['menu-line']} >
              {menuLine.map((menu, j) => (
                menu !== null ?
                (
                  <div key={j} className={styles['menu-item']} onClick={menu.onClick} >
                    <Icon path={menu.icon} size='100%' color={menu.color || '#111111'} />
                  </div>
                ) : (
                  <div key={j} className={styles['menu-div']} />
                )
              ))}
            </div>
          ))}
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
    
  );
};