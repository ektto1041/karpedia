import { TopicsDto, TopicsWithCategoriesDto } from '@/types/topic';
import styles from './TopicEditItem.module.css';
import EditBox from './EditBox';
import { ChangeEventHandler, useCallback, useState } from 'react';

type TopicEditItemProps = {
  topic: TopicsWithCategoriesDto;
  onClickUpdateTopic: (data: TopicsDto) => void;
  onClickDeleteTopic: (topicId: number) => void;
};

export default function TopicEditItem({
  topic,
  onClickUpdateTopic,
  onClickDeleteTopic,
}: TopicEditItemProps) {
  const {id, name, description} = topic

  const [topicName, setTopicName] = useState(name);
  const [topicDescription, setTopicDescription] = useState(description);
  
  const udpatedTopic: TopicsDto = { id, name: topicName , description: topicDescription };

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
      <EditBox onClickUpdate={onClickUpdateTopic} onClickDelete={onClickDeleteTopic} data={udpatedTopic} />
    </div>
  );
};