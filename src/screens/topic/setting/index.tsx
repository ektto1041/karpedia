import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import styles from './TopicSetting.module.css';
import { apis } from '@/utils/api';
import { CategoriesDto, NewCategoriesDto, NewTopicsDto, TopicsByCategory } from '@/types/topic';
import CategoryEditItem from './CategoryEditItem';
import AddBox from './AddBox';
import { useRouter } from 'next/router';

export default function TopicSettingScreen() {
  const router = useRouter();

  const [categories, setCategories] = useState<TopicsByCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

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

  const onChangeNewCategoryName = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setNewCategoryName(e.target.value);
  }, []);

  return (
    <div className={styles.container}>
      {categories.map(category => (
        <CategoryEditItem
          category={category}
          onClickCreateCategory={OnClickCreateCategory}
          onClickUpdateCategory={onClickUpdateCategory}
          onClickDeleteCategory={onClickDeleteCategory}
          onClickCreateTopic={OnClickCreateTopic}
        />
      ))}
      <div className={styles['new-category']} >
        <input type='text' className={styles['new-category']} placeholder='새 카테고리 이름을 입력하세요.' value={newCategoryName} onChange={onChangeNewCategoryName} />
        <AddBox onClickCreate={OnClickCreateCategory} data={{ name: newCategoryName }} />
      </div>
    </div>
  );
};