import styles from './SortChapterItem.module.css';
import css from '@/utils/css';
import Icon from '@mdi/react';
import { mdiTriangle, mdiTriangleDown } from '@mdi/js';
import { PostsDto } from '@/types/post';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { apis } from '@/utils/api';

type SortChapterItemData = {
  title: string;
  postsList?: PostsDto[];
};

type SortChapterItemProps<T> = {
  data: T;
  idx: number;
  isLast: boolean;
  onClickMoveParent: (from: number, to: number) => void;
};

export default function SortChapterItem<T extends SortChapterItemData>({
  data,
  idx,
  isLast,
  onClickMoveParent,
}: SortChapterItemProps<T>) {
  const router = useRouter();

  const {title} = data;
  const postList: PostsDto[] | undefined = data.postsList;
  const isChapter = Boolean(postList);

  const onClickMovePost = useCallback(async (from: number, to: number) => {
    if(postList) {
      const response = await apis.swapPostOrder(postList[from].id, postList[to].id);
      if(response.status < 300) {
        router.reload();
      }
    }
    
  }, [router, postList]);

  return (
    <div className={styles.container}>
      <div className={css(styles.content, isChapter ? styles.chapter : styles.post)}>
        {title}
        <div className={styles['button-box']}>
          <div
            className={css(styles.button, Boolean(idx > 0) ? styles.abled : styles.disabled)}
            onClick={Boolean(idx > 0) ? () => onClickMoveParent(idx, idx-1) : () => {}}
          >
            <Icon path={mdiTriangle} />
          </div>
          <div
            className={css(styles.button, !isLast ? styles.abled : styles.disabled)}
            onClick={!isLast ? () => onClickMoveParent(idx, idx+1) : () => {}}
          >
            <Icon path={mdiTriangleDown} />
          </div>
        </div>
      </div>
      {isChapter ? (
        <div className={styles.list}>
          {postList!.map((p, i) => (
            <SortChapterItem
              key={p.id}
              data={p}
              idx={i}
              isLast={Boolean(i === postList!.length-1)}
              onClickMoveParent={onClickMovePost}
            />
          ))}
        </div>
      ) : (<></>)}
    </div>
  );
};