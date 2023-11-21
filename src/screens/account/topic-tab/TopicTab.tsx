import { useCallback, useEffect, useState } from 'react';
import OptionItem from '../option-item/OptionItem';
import styles from './TopicTab.module.css';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import { apis } from '@/utils/api';
import { TopicsWithCategoriesNameDto } from '@/types/topic';
import SubscribedTopicItem from './SubscribedTopicItem';
import { Error } from '@/types/common';

export default function TopicTab() {
  const [isAlarmAllowedOld, setAlarmAllowedOld] = useState<boolean | undefined>();
  const [isAlarmAllowed, setAlarmAllowed] = useState(false);

  const [subscribedTopics, setSubscribedTopics] = useState<TopicsWithCategoriesNameDto[]>([]);

  const isReady = isAlarmAllowedOld !== undefined;

  const selfUser = useAppSelector(selectSelfUser);

  const getSubscribedTopics = useCallback(async () => {
    const response = await apis.getSubscribedTopics();
    if(response.status < 300) {
      setAlarmAllowedOld(response.data.isSubscribedTopicsAlarmAllowed);
      setAlarmAllowed(response.data.isSubscribedTopicsAlarmAllowed);
      setSubscribedTopics(response.data.topics);
    }
   }, []);

  useEffect(() => {
    if(selfUser) {
      getSubscribedTopics();
    } else {
      setAlarmAllowedOld(undefined);
      setSubscribedTopics([]);
    }
  }, [selfUser]);

  const onClickAllow = useCallback(() => {
    setAlarmAllowed(true);
  }, []);
  const onClickDisallow = useCallback(() => {
    setAlarmAllowed(false);
  }, []);

  const onClickSaveAlarmAllowed = useCallback(async () => {
    const response = await apis.updateIsSubscribedTopicsAlarmAllowed({ isSubscribedTopicsAlarmAllowed: isAlarmAllowed ? 1 : 0 });
    if(response.status < 300) {
      alert('알림 설정이 완료되었습니다.');

      setAlarmAllowedOld(isAlarmAllowed);
      setAlarmAllowed(isAlarmAllowed);
    } else {
      alert((response.data as Error).message);
    }
  }, [isAlarmAllowed]);

  const onClickCancelSubscribe = useCallback(async (topicId: number) => {
    const response = await apis.subscribeTopic(topicId);
    if(response.status < 300) {
      setSubscribedTopics(subscribedTopics.filter(topic => topic.id !== topicId));
    } else {
      alert('구독 해제 실패');
    }
  }, [subscribedTopics]);

  return (
    <div className={styles.container}>
      {isReady ? (<>
        <OptionItem
          name='알림 설정'
          description={['구독한 토픽에 새 포스트가 작성되면 이메일로 소식을 전달합니다.']}
          buttons={[{label: '적용', disabled: (Boolean(isAlarmAllowedOld) === Boolean(isAlarmAllowed)), onClick: onClickSaveAlarmAllowed}]}
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
              <SubscribedTopicItem key={topic.id} topic={topic} onClickCancelSubscribe={onClickCancelSubscribe} />
            ))}
          </div>
        </OptionItem>
      </>) : (<></>)}
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
    <div className={styles['radio-item']} onClick={onClick}>
      <input type='radio' checked={value} onChange={() => {}}/>
      <span>{label}</span>
    </div>
  )
}