import styles from './CommentInput.module.css';
import Icon from '@mdi/react';
import { mdiKeyboardReturn } from '@mdi/js';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { CommentType, NewCommentType } from '@/types/post';
import { apis } from '@/utils/api';

type CommentInputProps = {
  placeholder: string,
  postId: string,
  revalidateCommentList: () => void,
};

export default function CommentInput({
  placeholder,
  postId,
  revalidateCommentList,
} : CommentInputProps) {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const addComment = useCallback(async (newComment: NewCommentType) => {
    const result = await apis.createComment(newComment);
  
    if(result.status === 200) {
      revalidateCommentList();

      setName('');
      setPassword('');
      setContent('');
      setDisabled(false);
    } else {
      alert('댓글 작성에 실패했습니다.');
    }
  }, [revalidateCommentList]);

  const handleSubmit = () => {
    const canSubmit = Boolean(name && password && content);
    if(!canSubmit) {
      alert('이름과 비밀번호, 내용을 모두 입력해주세요.');
      return;
    }

    setDisabled(true);

    const newComment: NewCommentType = {
      postId, name, password, content,
    };

    addComment(newComment);
  };

  return (
    <div className={styles.container}>
      <div className={styles['info-box']}>
        <input
          type='text'
          placeholder='작성자 이름'
          maxLength={12}
          value={name}
          onChange={handleChangeName}
          disabled={isDisabled}
        />
        <input
          type='password'
          placeholder='비밀번호'
          maxLength={6}
          value={password}
          onChange={handleChangePassword}
          disabled={isDisabled}
        />
      </div>
      <div className={styles['textarea-box']}>
        <textarea
          maxLength={1000}
          placeholder={placeholder}
          value={content}
          onChange={handleChangeContent}
          disabled={isDisabled}
        />
        <button onClick={handleSubmit}>
          <Icon path={mdiKeyboardReturn} size='20px' />
        </button>
      </div>
    </div>
  );
};