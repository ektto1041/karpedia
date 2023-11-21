import { useCallback, useEffect, useState } from 'react';
import OptionItem from '../option-item/OptionItem';
import styles from './TopicTab.module.css';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import { apis } from '@/utils/api';
import { TopicsWithCategoriesNameDto } from '@/types/topic';
import SubscribedTopicItem from './SubscribedTopicItem';

export default function TopicTab() {
  const [isAlarmAllowed, setAlarmAllowed] = useState(false);

  const [subscribedTopics, setSubscribedTopics] = useState<TopicsWithCategoriesNameDto[]>([]);

  const selfUser = useAppSelector(selectSelfUser);

  const getSubscribedTopics = useCallback(async () => {
    const response = await apis.getSubscribedTopics();
    if(response.status < 300) {
      setSubscribedTopics(response.data);
    }
   }, []);

  useEffect(() => {
    if(selfUser) {
      getSubscribedTopics();
    } 
  }, [selfUser]);

  const onClickAllow = useCallback(() => {
    setAlarmAllowed(true);
  }, []);

  const onClickDisallow = useCallback(() => {
    setAlarmAllowed(false);
  }, []);

  return (
    <div className={styles.container}>
      <OptionItem
        name='알림 설정'
        description={['구독한 토픽에 새 포스트가 작성되면 이메일로 소식을 전달합니다.']}
        buttons={[]}
      >
        <div>
          <RadioItem label='허용' value={isAlarmAllowed} onClick={onClickAllow} />
          <RadioItem label='비허용' value={!isAlarmAllowed} onClick={onClickDisallow} />
        </div>
      </OptionItem>
      <OptionItem
        name='구독한 토픽'
        description={['구독한 토픽 리스트가 보여집니다.']}
        buttons={[]}
      >
        <div>
          {subscribedTopics.map(topic => (
            <SubscribedTopicItem key={topic.id} topic={topic} />
          ))}
        </div>
      </OptionItem>
    </div>
  );
}

type RadioItemProps = {
  label: string;
  value: boolean;
  onClick: () => void;
}

function RadioItem({
  label,
  value,
  onClick,
}: RadioItemProps) {
  return (
    <div className={styles['radio-item']}>
      <input type='radio' checked={value} onChange={onClick} />
      <span>{label}</span>
    </div>
  )
}