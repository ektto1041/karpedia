import styles from './EditBox.module.css';
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';
import { mdiDeleteCircle } from '@mdi/js';

type EditBoxProps = {
  onClickUpdate: (data: {id: number, name: string, description?: string}) => void;
  onClickDelete: (id: number) => void;
  data: {id: number, name: string, description?: string};
};

export default function EditBox({
  onClickUpdate,
  onClickDelete,
  data,
}: EditBoxProps) {

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