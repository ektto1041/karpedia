import { useCallback, useEffect, useState } from 'react';
import OptionItem from '../option-item/OptionItem';
import styles from './ProfileTab.module.css';
import Image from 'next/image';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import { apis } from '@/utils/api';

export default function ProfileTab() {
  const selfUser = useAppSelector(selectSelfUser);
  
  const [oldProfileImage, setOldProfileImage] = useState<string>();
  const [newProfileImage, setNewProfileImage] = useState<string>();
  const isTabReady = Boolean(newProfileImage);

  useEffect(() => {
    if(selfUser) {
      setOldProfileImage(selfUser.profileImage);
      setNewProfileImage(selfUser.profileImage);
    } else {
      setOldProfileImage(undefined);
      setNewProfileImage(undefined);
    }
  }, [selfUser]);

  const onClickSetImage = useCallback(() => {
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.setAttribute('style', 'display: none;');
    imageInput.accept = 'image/*';
    imageInput.addEventListener('change', async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files ? target.files[0] : null;

      if(file) {
        const MAX_SIZE = 1000000;
        if(file.size <= MAX_SIZE) {
          const formData = new FormData();
          formData.append('file', file);

          const response = await apis.uploadImageToS3(formData);
          if(response.status < 300) {
            setNewProfileImage(response.data);

          } else if(response.status === 500) {
            alert('서버 오류로 인해 이미지 업로드에 실패했습니다.');
          }
        } else {
          alert('이미지 파일의 용량은 1MB 를 초과할 수 없습니다.');
        }
      } else {
        alert('이미지 파일을 선택하지 않았습니다.');
      }

      document.body.removeChild(imageInput);
    });
    imageInput.addEventListener('cancel', () => {
      alert('이미지 파일을 선택하지 않았습니다.');

      document.body.removeChild(imageInput);
    })

    document.body.appendChild(imageInput);
    imageInput.click();
  }, []);

  const onClickSaveProfileImage = useCallback(() => {

  }, []);

  return (
    <div className={styles.container} >
      {isTabReady ? (
        <>
          <OptionItem
            name='프로필 이미지 수정'
            description={['사용자들에게 보여질 프로필 이미지를 수정합니다.', '1MB 이하의 이미지 파일만 가능합니다.']}
            buttons={[{ label: '저장', disabled: oldProfileImage === newProfileImage, onClick: () => {} }]}
          >
            <div className={styles['profile-image-box']} onClick={onClickSetImage}>
              <div className={styles['comment-size-image']}>
                <Image src={newProfileImage!} alt='댓글 프로필 이미지' fill />
              </div>
              <div className={styles['nav-bar-size-image']}>
                <Image src={newProfileImage!} alt='탐색창 프로필 이미지' fill />
              </div>
            </div>
          </OptionItem>
          <OptionItem name='프로필 정보 수정' description={['닉네임을 수정합니다.']} buttons={[{ label: '저장', disabled: true, onClick: () => {} }]}>
            <input type='text' placeholder={''} />
          </OptionItem>
        </>
      ) : (<></>)}
    </div>
  );
}