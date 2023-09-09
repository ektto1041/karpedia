import { CategoriesDto, NewCategoriesDto, NewTopicsDto, TopicsByCategory } from '@/types/topic';
import styles from './CategoryEditItem.module.css';
import EditBox from './EditBox';
import TopicEditItem from './TopicEditItem';
import AddBox from './AddBox';
import { ChangeEventHandler, useCallback, useState } from 'react';

type CategoryEditItemProps = {
  category: TopicsByCategory;
  onClickCreateCategory: (data: NewCategoriesDto) => void;
  onClickUpdateCategory: (data: CategoriesDto) => void;
  onClickDeleteCategory: (categoryId: number) => void;
  onClickCreateTopic: (data: NewTopicsDto) => void;
};

export default function CategoryEditItem({
  category,
  onClickCreateCategory,
  onClickUpdateCategory,
  onClickDeleteCategory,
  onClickCreateTopic,
}: CategoryEditItemProps) {
  const {id, name, topics} = category;

  const [categoryName, setCategoryName] = useState<string>(name);
  const [newTopicName, setNewTopicName] = useState<string>('');
  const [newTopicDescription, setNewTopicDescription] = useState<string>('');

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
            <TopicEditItem topic={topic} />
          ))}
        </div>
      )}
      <div className={styles['new-topic']} >
        <input type='text' placeholder='새 토픽 이름을 입력하세요.' value={newTopicName} onChange={onChangeNewTopicName} />
        <input type='text' placeholder='새 토픽 설명을 입력하세요.' value={newTopicDescription} onChange={onChangeNewTopicDescription} />
        <AddBox onClickCreate={onClickCreateTopic} data={{ name: newTopicName, description: newTopicDescription }} />
      </div>
      <EditBox onClickUpdate={onClickUpdateCategory} onClickDelete={onClickDeleteCategory} data={{id, name: categoryName}} />
    </div>
  )
}