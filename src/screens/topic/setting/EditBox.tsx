import styles from './EditBox.module.css';
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';
import { mdiDeleteCircle } from '@mdi/js';
import { TopicsDto } from '@/types/topic';
import { CategoriesDto } from '@/types/category';

type EditBoxProps<T> = {
  onClickUpdate: (data: T) => void;
  onClickDelete: (id: number) => void;
  data: T;
};

export default function EditBox<T extends CategoriesDto | TopicsDto>({
  onClickUpdate,
  onClickDelete,
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
    </div>
  );
};