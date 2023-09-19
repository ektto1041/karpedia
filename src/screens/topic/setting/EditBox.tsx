import styles from './EditBox.module.css';
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';
import { mdiDeleteCircle } from '@mdi/js';
import { mdiArrowDownDropCircle } from '@mdi/js';
import { mdiArrowUpDropCircle } from '@mdi/js';
import { TopicsDto } from '@/types/topic';
import { CategoriesDto } from '@/types/category';
import css from '@/utils/css';

type EditBoxProps<T> = {
  onClickUpdate: (data: T) => void;
  onClickDelete: (id: number) => void;
  hasUpper: boolean,
  hasLower: boolean,
  onClickMoveUp: () => void;
  onClickMoveDown: () => void;
  data: T;
};

export default function EditBox<T extends CategoriesDto | TopicsDto>({
  onClickUpdate,
  onClickDelete,
  hasUpper,
  hasLower,
  onClickMoveUp,
  onClickMoveDown,
  data,
}: EditBoxProps<T>) {

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={() => onClickUpdate(data)}>
        <Icon path={mdiPencilCircle} />
      </div>
      <div className={styles.button} onClick={() => onClickDelete(data.id)}>
        <Icon path={mdiDeleteCircle} />
      </div>
      <div className={css(styles.button, hasUpper ? '' : styles.disabled)} onClick={hasUpper ? onClickMoveUp : () => {}}>
        <Icon path={mdiArrowUpDropCircle} />
      </div>
      <div className={css(styles.button, hasLower ? '' : styles.disabled)} onClick={hasLower ? onClickMoveDown : () => {}}>
        <Icon path={mdiArrowDownDropCircle} />
      </div>
    </div>
  );
};