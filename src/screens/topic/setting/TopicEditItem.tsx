import { TopicsDto, TopicsWithCategoriesIdDto } from '@/types/topic';
import styles from './TopicEditItem.module.css';
import EditBox from './EditBox';
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';

type TopicEditItemProps = {
  topic: TopicsWithCategoriesIdDto;
  topicIdx: number;
  isLast: boolean;
  onClickUpdateTopic: (data: TopicsDto) => void;
  onClickDeleteTopic: (topicId: number) => void;
  onClickMoveTopic: (from: number, to: number) => void;
};

export default function TopicEditItem({
  topic,
  topicIdx,
  isLast,
  onClickUpdateTopic,
  onClickDeleteTopic,
  onClickMoveTopic,
}: TopicEditItemProps) {
  const {id, name, description} = topic

  const [topicName, setTopicName] = useState(name);
  const [topicDescription, setTopicDescription] = useState(description);

  const hasUpper = useMemo(() => topicIdx > 0, [topicIdx]);

  const udpatedTopic: TopicsDto = { id, name: topicName , description: topicDescription, orders: topic.orders };

  const onChangeTopicName = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setTopicName(e.target.value);
  }, []);

  const onChangeTopicDescription = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setTopicDescription(e.target.value);
  }, []);

  return (
    <div className={styles.container}>
      <input type='text' className={styles['topic-name']} value={topicName} onChange={onChangeTopicName} />
      <input type='text' className={styles['topic-description']} value={topicDescription} onChange={onChangeTopicDescription} />
      <EditBox
        onClickUpdate={onClickUpdateTopic}
        onClickDelete={onClickDeleteTopic}
        hasUpper={hasUpper}
        hasLower={!isLast}
        onClickMoveUp={() => onClickMoveTopic(topicIdx, topicIdx-1)}
        onClickMoveDown={() => onClickMoveTopic(topicIdx, topicIdx+1)}
        data={udpatedTopic}
      />
    </div>
  );
};