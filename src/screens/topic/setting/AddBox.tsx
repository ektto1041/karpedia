import styles from './AddBox.module.css';
import Icon from '@mdi/react';
import { mdiPlusCircle } from '@mdi/js';
import { NewTopicsDto } from '@/types/topic';
import { NewCategoriesDto } from '@/types/category';

type AddBoxProps<T> = {
  onClickCreate: (data: T) => void;
  data: T;
};

export default function AddBox<T extends NewCategoriesDto | NewTopicsDto>({
  onClickCreate,
  data,
}: AddBoxProps<T>) {
  return (
    <div className={styles.container} onClick={() => onClickCreate(data)} >
      <Icon path={mdiPlusCircle} />
    </div>
  );
};