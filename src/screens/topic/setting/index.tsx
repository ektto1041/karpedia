import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import styles from './TopicSetting.module.css';
import { apis } from '@/utils/api';
import { CategoriesDto, NewCategoriesDto, NewTopicsDto, TopicsByCategory, TopicsDto } from '@/types/topic';
import CategoryEditItem from './CategoryEditItem';
import AddBox from './AddBox';
import { useRouter } from 'next/router';

export default function TopicSettingScreen() {
  const router = useRouter();

  const [categories, setCategories] = useState<TopicsByCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  const newCategory: NewCategoriesDto = { name: newCategoryName };

  useEffect(() => {
    getAllTopics();
  }, []);

  const getAllTopics = async () => {
    const response = await apis.getAllTopicsWithCategoriesForSetting();
    const { categories, topics } = response.data;

    topics.sort((a, b) => (a.categoriesId - b.categoriesId));
    const categoriesWithTopics: TopicsByCategory[] = categories.map(c => ({ ...c, topics: topics.filter(t => t.categoriesId === c.id), }));
    setCategories(categoriesWithTopics);
  };

  const OnClickCreateCategory = useCallback(async (data: NewCategoriesDto) => {
    const response = await apis.createCategory(data);
    if(response.status >= 200 && response.status < 300) {
      router.reload();
    }
  }, []);

  const onClickUpdateCategory = useCallback(async (data: CategoriesDto) => {
    const response = await apis.updateCategory(data);
    if(response.status === 200) {
      router.reload();
    }
  }, []);

  const onClickDeleteCategory = useCallback(async (categoryId: number) => {
    const response = await apis.deleteCategory(categoryId);
    if(response.status === 200) {
      router.reload();
    }
  }, []);

  const OnClickCreateTopic = useCallback(async (data: NewTopicsDto) => {
    const response = await apis.createTopic(data);
    if(response.status >= 200 && response.status < 300) {
      router.reload();
    }
  }, []);

  const onClickUpdateTopic = useCallback(async (data: TopicsDto) => {
    const response = await apis.updateTopic(data);
    if(response.status === 200) {
      router.reload();
    }
  }, []);

  const onClickDeleteTopic = useCallback(async (topicId: number) => {
    const response = await apis.deleteTopic(topicId);
    if(response.status === 200) {
      router.reload();
    }
  }, []);

  const onChangeNewCategoryName = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setNewCategoryName(e.target.value);
  }, []);

  return (
    <div className={styles.container}>
      {categories.map(category => (
        <CategoryEditItem key={category.id}
          category={category}
          onClickUpdateCategory={onClickUpdateCategory}
          onClickDeleteCategory={onClickDeleteCategory}
          onClickCreateTopic={OnClickCreateTopic}
          onClickUpdateTopic={onClickUpdateTopic}
          onClickDeleteTopic={onClickDeleteTopic}
        />
      ))}
      <div className={styles['new-category']} >
        <input type='text' className={styles['new-category']} placeholder='새 카테고리 이름을 입력하세요.' value={newCategoryName} onChange={onChangeNewCategoryName} />
        <AddBox onClickCreate={OnClickCreateCategory} data={newCategory} />
      </div>
    </div>
  );
};