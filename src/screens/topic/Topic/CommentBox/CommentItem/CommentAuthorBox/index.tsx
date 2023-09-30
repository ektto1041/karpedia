import Image from 'next/image';
import styles from './CommentAuthorBox.module.css';

type CommentAuthorBoxProps = {
  profileImage: string;
};

export default function CommentAuthorBox({
  profileImage,
}: CommentAuthorBoxProps) {

  return (
    <div className={styles.container}>
      <div className={styles['profile-image']} >
        <Image src={profileImage} alt='profile image' fill />      
      </div>
    </div>
  );
};