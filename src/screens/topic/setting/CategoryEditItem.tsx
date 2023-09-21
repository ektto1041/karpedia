import { NewTopicsDto, TopicsDto } from '@/types/topic';
import styles from './CategoryEditItem.module.css';
import EditBox from './EditBox';
import TopicEditItem from './TopicEditItem';
import AddBox from './AddBox';
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import { CategoriesDto, TopicsByCategory } from '@/types/category';
import { apis } from '@/utils/api';
import { useRouter } from 'next/router';

type CategoryEditItemProps = {
  category: TopicsByCategory;
  categoryIdx: number;
  isLast: boolean;
  onClickUpdateCategory: (data: CategoriesDto) => void;
  onClickDeleteCategory: (categoryId: number) => void;
  onClickMoveCategory: (from: number, to: number) => void;
  onClickCreateTopic: (data: NewTopicsDto) => void;
  onClickUpdateTopic: (data: TopicsDto) => void;
  onClickDeleteTopic: (topicId: number) => void;
  revalidateTopic: (callback: () => void) => Promise<void>;
};

export default function CategoryEditItem({
  category,
  categoryIdx,
  isLast,
  onClickUpdateCategory,
  onClickDeleteCategory,
  onClickMoveCategory,
  onClickCreateTopic,
  onClickUpdateTopic,
  onClickDeleteTopic,
  revalidateTopic,
}: CategoryEditItemProps) {
  const router = useRouter();

  const {id, name, orders, topics} = category;

  const [categoryName, setCategoryName] = useState<string>(name);
  const [newTopicName, setNewTopicName] = useState<string>('');
  const [newTopicDescription, setNewTopicDescription] = useState<string>('');

  const hasUpper = useMemo(() => categoryIdx > 0, [categoryIdx]);

  const updatedCategory: CategoriesDto = { id, name: categoryName, orders };
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

  // TODO
  const onClickMoveTopic = useCallback(async (from: number, to: number) => {
    const response = await apis.swapTopicOrder(topics[from].id, topics[to].id);
    if(response.status < 300) {
      revalidateTopic(() => {
        router.reload();
      })
    }
  }, [topics, router]);

  return (
    <div className={styles.container} >
      <input type='text' value={categoryName} onChange={onChangeCategoryName} />
      {topics.length > 0 && (
        <div className={styles['topic-list']}>
          {topics.map((topic, i) => (
            <TopicEditItem key={topic.id}
              topic={topic}
              topicIdx={i}
              isLast={Boolean(topics.length-1 === i)}
              onClickUpdateTopic={onClickUpdateTopic}
              onClickDeleteTopic={onClickDeleteTopic}
              onClickMoveTopic={onClickMoveTopic}
            />
          ))}
        </div>
      )}
      <div className={styles['new-topic']} >
        <input type='text' placeholder='새 토픽 이름을 입력하세요.' value={newTopicName} onChange={onChangeNewTopicName} />
        <input type='text' placeholder='새 토픽 설명을 입력하세요.' value={newTopicDescription} onChange={onChangeNewTopicDescription} />
        <AddBox onClickCreate={onClickCreateTopic} data={newTopic} />
      </div>
      <EditBox
        onClickUpdate={onClickUpdateCategory}
        onClickDelete={onClickDeleteCategory}
        hasUpper={hasUpper}
        hasLower={!isLast}
        onClickMoveUp={() => onClickMoveCategory(categoryIdx, categoryIdx-1)}
        onClickMoveDown={() => onClickMoveCategory(categoryIdx, categoryIdx+1)}
        data={updatedCategory} />
    </div>
  )
}