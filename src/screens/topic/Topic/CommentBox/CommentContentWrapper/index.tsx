import Image from 'next/image';
import styles from './CommentContentWrapper.module.css';
import { PublicUsersDto } from '@/types/user';
import { LegacyRef } from 'react';

type CommentContentWrapperProps = {
  user: PublicUsersDto;
  children: JSX.Element;
  refs: LegacyRef<HTMLDivElement>;
}

export default function CommentContentWrapper({
  user,
  children,
  refs,
}: CommentContentWrapperProps) {
  return (
    <div className={styles.container} ref={refs}>
      <div className={styles['author-box']}>
        <div className={styles['profile-image']} >
          <Image src={user.profileImage} alt='profile image' fill />      
        </div>
      </div>
      <div className={styles['content']}>
        {children}
      </div>
    </div>
  );
}