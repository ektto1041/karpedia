import { useState } from 'react';
import OptionItem from '../option-item/OptionItem';
import styles from './ProfileTab.module.css';

export default function ProfileTab() {
  const [newUsername, setNewUsername] = useState('박상연'); 

  return (
    <div className={styles.container} >
      <OptionItem name='프로필 이미지 수정' description='사용자들에게 보여질 프로필 이미지를 수정합니다.' buttons={[{ label: '저장', onClick: () => {} }]}>
        <></>
      </OptionItem>
      <OptionItem name='프로필 정보 수정' description='닉네임을 수정합니다.' buttons={[{ label: '저장', onClick: () => {} }]}>
        <input type='text' placeholder={newUsername} />
      </OptionItem>
    </div>
  );
}