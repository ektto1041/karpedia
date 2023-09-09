import styles from './AddBox.module.css';
import Icon from '@mdi/react';
import { mdiPlusCircle } from '@mdi/js';

type AddBoxProps = {
  onClickCreate: (data: {name: string, description?: string}) => void;
  data: {name: string, description?: string};
};

export default function AddBox({
  onClickCreate,
  data,
}: AddBoxProps) {
  return (
    <div className={styles.container} onClick={() => onClickCreate(data)} >
      <Icon path={mdiPlusCircle} />
    </div>
  );
};