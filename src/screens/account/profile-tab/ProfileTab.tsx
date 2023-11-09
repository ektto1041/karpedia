import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import OptionItem from '../option-item/OptionItem';
import styles from './ProfileTab.module.css';
import Image from 'next/image';
import useAppSelector from '@/hooks/useAppSelector';
import { resetSelfUser, selectSelfUser, updateName, updateProfileImage } from '@/redux/slices/AuthSlice';
import { apis } from '@/utils/api';
import useAppDispatch from '@/hooks/useAppDispatch';
import { useRouter } from 'next/router';

const checkUsername = (username: string): boolean => {
  let len = 0;
    for (let i=0; i<username.length; i++) {
        const char = username[i];
        if(i === 0 && !(/[가-힣a-zA-Z]/.test(char))) return false;

        if (/[가-힣]/.test(char)) {
            len += 2;
        } else if (/[a-zA-Z0-9_]/.test(char)) {
            len += 1;
        } else {
            return false; // 특수문자 또는 공백이 포함되어 있음
        }
    }

    return len >= 6 && len <= 16;
}

export default function ProfileTab() {
  const router = useRouter();
  const selfUser = useAppSelector(selectSelfUser);
  const dispatch = useAppDispatch();
  
  const [oldProfileImage, setOldProfileImage] = useState<string>();
  const [newProfileImage, setNewProfileImage] = useState<string>();
  const [isProfileImageLoading, setProfileImageLoading] = useState(false);

  const [oldUsername, setOldUsername] = useState<string>();
  const [newUsername, setNewUsername] = useState<string>();
  const [isUsernameValid, setUsernameValid] = useState(true);

  const [isLogoutWaiting, setLogoutWaiting] = useState(false);
  
  const isTabReady = Boolean(oldProfileImage && oldUsername);

  useEffect(() => {
    if(selfUser) {
      setNewProfileImage(selfUser.profileImage);
      setOldProfileImage(selfUser.profileImage);
      setNewUsername(selfUser.name);
      setOldUsername(selfUser.name);
    } else {
      setNewProfileImage(undefined);
      setOldProfileImage(undefined);
      setNewUsername(undefined);
      setOldUsername(undefined);
    }
  }, [selfUser]);

  const onClickSetImage = useCallback(() => {
    if(isProfileImageLoading) return;
    setProfileImageLoading(true);

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

          setProfileImageLoading(false);
        } else {
          alert('이미지 파일의 용량은 1MB 를 초과할 수 없습니다.');
          setProfileImageLoading(false);
        }
      } else {
        alert('이미지 파일을 선택하지 않았습니다.');
        setProfileImageLoading(false);
      }

      document.body.removeChild(imageInput);
    });
    imageInput.addEventListener('cancel', () => {
      alert('이미지 파일을 선택하지 않았습니다.');
      setProfileImageLoading(false);

      document.body.removeChild(imageInput);
    })

    document.body.appendChild(imageInput);
    imageInput.click();
  }, [isProfileImageLoading]);

  const onClickSaveProfileImage = useCallback(async () => {
    if(isProfileImageLoading) return;

    const response = await apis.updateProfileImage({profileImage: newProfileImage!});
    if(response.status < 300) {
      dispatch(updateProfileImage(newProfileImage));
      alert('프로필 이미지가 변경되었습니다.');
    }
  }, [isProfileImageLoading, newProfileImage]);

  const onChangeUsername: ChangeEventHandler<HTMLInputElement> = (e) => {
    const username = e.target.value;
    const isValid = checkUsername(username);

    setUsernameValid(isValid);
    setNewUsername(username);
  };

  const onClickSaveUsername = useCallback(async () => {
    const response = await apis.updateName({name: newUsername!});
    if(response.status < 300) {
      dispatch(updateName(newUsername));
      alert('이름이 변경되었습니다.');
    }
  }, [dispatch, newUsername]);

  const onClickSaveUsernameByEmail = useCallback(async () => {
    const email = selfUser!.email;
    const response = await apis.updateName({name: email});
    if(response.status < 300) {
      dispatch(updateName(email));
      alert('이름이 변경되었습니다.');
    }
  }, [dispatch, selfUser]);

  const onClickLogout = useCallback(async () => {
    setLogoutWaiting(true);
    const response = await apis.logout();
    if(response.status < 300) {
      dispatch(resetSelfUser());
      router.push('/');
    } else {
      alert('로그아웃에 실패했습니다. 관리자에게 문의해주세요.');
    }
    setLogoutWaiting(false);
  }, [dispatch, router,]);

  return (
    <div className={styles.container} >
      {isTabReady ? (
        <>
          <OptionItem
            name='프로필 이미지 수정'
            description={['사용자들에게 보여질 프로필 이미지를 수정합니다.', '1MB 이하의 이미지 파일만 가능합니다.']}
            buttons={[{ label: '저장', disabled: oldProfileImage === newProfileImage, onClick: onClickSaveProfileImage }]}
          >
            <div className={styles['profile-image-box']} onClick={onClickSetImage}>
              {isProfileImageLoading && <div className={styles.disabled} />}
              <div className={styles['comment-size-image']}>
                <Image src={newProfileImage!} alt='댓글 프로필 이미지' fill />
              </div>
              <div className={styles['nav-bar-size-image']}>
                <Image src={newProfileImage!} alt='탐색창 프로필 이미지' fill />
              </div>
            </div>
          </OptionItem>
          <OptionItem
            name='프로필 정보 수정'
            description={['사용자들에게 보여질 이름을 수정합니다.', '한글 2byte, 영어/숫자/_ 1byte 기준 16byte 까지 작성이 가능합니다.', '이름은 한글 혹은 영어로 시작해야합니다.']}
            buttons={[
              { label: '이메일을 이름으로 사용', disabled: (selfUser!.email === oldUsername), onClick: onClickSaveUsernameByEmail },
              { label: '저장', disabled: !(isUsernameValid && (oldUsername !== newUsername)), onClick: onClickSaveUsername }
            ]}
          >
            <div className={styles['username-box']}>
              <input type='text' placeholder={''} value={newUsername} onChange={onChangeUsername} />
              {!isUsernameValid && <div className={styles['username-warning']}>사용할 수 없는 이름입니다.</div>}
            </div>
          </OptionItem>
          <OptionItem
            name='로그아웃'
            description={['Karpedia에서 로그아웃하고 메인 페이지로 돌아갑니다.']}
            buttons={[
              { label: '로그아웃', disabled: isLogoutWaiting, onClick: onClickLogout },
            ]}
          />
        </>
      ) : (<></>)}
    </div>
  );
}