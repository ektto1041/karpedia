import { CategoriesDto, NewCategoriesDto, NewTopicsDto, TopicsByCategory, TopicsDto } from '@/types/topic';
import styles from './CategoryEditItem.module.css';
import EditBox from './EditBox';
import TopicEditItem from './TopicEditItem';
import AddBox from './AddBox';
import { ChangeEventHandler, useCallback, useState } from 'react';

type CategoryEditItemProps = {
  category: TopicsByCategory;
  onClickUpdateCategory: (data: CategoriesDto) => void;
  onClickDeleteCategory: (categoryId: number) => void;
  onClickCreateTopic: (data: NewTopicsDto) => void;
  onClickUpdateTopic: (data: TopicsDto) => void;
  onClickDeleteTopic: (topicId: number) => void;
};

export default function CategoryEditItem({
  category,
  onClickUpdateCategory,
  onClickDeleteCategory,
  onClickCreateTopic,
  onClickUpdateTopic,
  onClickDeleteTopic,
}: CategoryEditItemProps) {
  const {id, name, topics} = category;

  const [categoryName, setCategoryName] = useState<string>(name);
  const [newTopicName, setNewTopicName] = useState<string>('');
  const [newTopicDescription, setNewTopicDescription] = useState<string>('');

  const updatedCategory: CategoriesDto = { id, name: categoryName };
  const newTopic: NewTopicsDto = { categoriesId: id, name: newTopicName, description: newTopicDescription };

  const onChangeCategoryName = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setCategoryName(e.target.value);
  }, []);

  const onChangeNewTopicName = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setNewTopicName(e.target.value);
  }, []);

  const onChangeNewTopicDescription = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setNewTopicDescription(e.target.value);
  }, []);

  return (
    <div className={styles.container} >
      <input type='text' value={categoryName} onChange={onChangeCategoryName} />
      {topics.length > 0 && (
        <div className={styles['topic-list']}>
          {topics.map(topic => (
            <TopicEditItem key={topic.id}
              topic={topic}
              onClickUpdateTopic={onClickUpdateTopic}
              onClickDeleteTopic={onClickDeleteTopic}
            />
          ))}
        </div>
      )}
      <div className={styles['new-topic']} >
        <input type='text' placeholder='새 토픽 이름을 입력하세요.' value={newTopicName} onChange={onChangeNewTopicName} />
        <input type='text' placeholder='새 토픽 설명을 입력하세요.' value={newTopicDescription} onChange={onChangeNewTopicDescription} />
        <AddBox onClickCreate={onClickCreateTopic} data={newTopic} />
      </div>
      <EditBox onClickUpdate={onClickUpdateCategory} onClickDelete={onClickDeleteCategory} data={updatedCategory} />
    </div>
  )
}