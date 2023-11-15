import { apis } from '@/utils/api';
import OptionItem from '../option-item/OptionItem';
import styles from './CommentTab.module.css';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import { useCallback, useEffect, useState } from 'react';
import { CommentsByUsersDto } from '@/types/comment';
import CommentTabItem from './CommentTabItem';

export default function CommentTab() {
  const selfUser = useAppSelector(selectSelfUser);

  const [comments, setComments] = useState<CommentsByUsersDto[]>([]);

  const getComments = useCallback(async () => {
    const response = await apis.getAllByUserId(selfUser!.id)
    if(response.status < 300) {
      setComments(response.data);
    }
  }, [selfUser]);

  useEffect(() => {
    if(selfUser) {
      getComments();
    } else {
      setComments([]);
    }
  }, [selfUser]);

  return (
    <div className={styles.container}>
      <OptionItem
        name='작성한 댓글'
        description={[]}
        buttons={[]}
      >
        <div>
          {comments.map(comment => (
            <CommentTabItem key={comment.id} comment={comment} />
          ))}
        </div>
      </OptionItem>
    </div>
  );
}