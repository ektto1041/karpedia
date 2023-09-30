import { Editor, EditorContent, useEditor } from '@tiptap/react';
import styles from './CommentEditor.module.css';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import { mdiFormatHeader3 } from '@mdi/js';
import { mdiFormatUnderline, mdiFormatStrikethrough, mdiFormatItalic, mdiFormatBold } from '@mdi/js';
import { mdiLinkVariant } from '@mdi/js';
import Icon from '@mdi/react';
import { useCallback, useMemo } from 'react';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Link from '@tiptap/extension-link';
import Italic from '@tiptap/extension-italic';
import History from '@tiptap/extension-history';
import TextStyle from '@tiptap/extension-text-style';
import Bold from '@tiptap/extension-bold';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';

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

export default function CommentEditor({
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
      Underline,
      Strike,
      Link.configure({
        HTMLAttributes: {
          rel: 'noopener noreferrer',
        }
      }),
      Italic,
      History,
      TextStyle,
      Bold,
      Placeholder.configure({
        emptyEditorClass: 'empty-editor',
        placeholder: '댓글을 입력해주세요.',
      }),
      CharacterCount.configure({
        limit: 300,
      }),
    ],
    editorProps: {
      attributes: {
        class: `comment-editor${editable ? ' editable' : ''}`,
      },
    },
    onUpdate: (p) => onChangeContent(p.editor.getHTML()),
    content: defaultContent,
    editable,
  }, [defaultContent]) as Editor;

  const setLink = useCallback(() => {
    const url = prompt('URL 을 입력해주세요.');
    if(url === null) return;
    editor.commands.setLink({ href: url });
  }, [editor]);

  const menuList: Menu[] = useMemo(() => [
      { icon: mdiFormatHeader3, onClick: () => editor.chain().toggleHeading({ level: 3}).run(), },
      { icon: mdiFormatBold, onClick: () => editor.commands.toggleBold(), },
      { icon: mdiFormatUnderline, onClick: () => editor.commands.toggleUnderline(), },
      { icon: mdiFormatStrikethrough, onClick: () => editor.commands.toggleStrike(), },
      { icon: mdiFormatItalic, onClick: () => editor.commands.toggleItalic(), },
      { icon: mdiLinkVariant, onClick: () => setLink(), },
  ], [editor, setLink]);

  return (
    <div className={styles.container} >
      {editable && (
        <div className={styles['menu-bar']} >
          {menuList.map((menu, i) => (
            <div key={i} className={styles['menu-item']} onClick={menu.onClick} >
              <Icon path={menu.icon} />
            </div>
          ))}
        </div>
      )}
      <EditorContent editor={editor} />
      {editable && (<div className={styles['character-count']}>{editor?.storage.characterCount.characters()}/{300}</div>)}
    </div>
  );
};