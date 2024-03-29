import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import styles from './TopicSetting.module.css';
import { apis } from '@/utils/api';
import { NewTopicsDto, TopicsDto } from '@/types/topic';
import CategoryEditItem from './CategoryEditItem';
import AddBox from './AddBox';
import { useRouter } from 'next/router';
import { CategoriesDto, NewCategoriesDto, TopicsByCategory } from '@/types/category';
import CheckBox from '@/components/CheckBox/CheckBox';

export default function TopicSettingScreen() {
  const router = useRouter();

  const [isSortingMode, setSortingMode] = useState(false);
  const [categories, setCategories] = useState<TopicsByCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  const newCategory: NewCategoriesDto = { name: newCategoryName };

  useEffect(() => {
    getAllTopics();
  }, []);

  const getAllTopics = async () => {
    const response = await apis.getAllTopicsWithCategoriesForSetting();
    const { categories, topics } = response.data;

    const categoriesWithTopics: TopicsByCategory[] = categories.map(c => ({ ...c, topics: topics.filter(t => t.categoriesId === c.id), }));
    setCategories(categoriesWithTopics);
  };

  const revalidateTopic = useCallback(async (callback: () => void) => {
    await apis.revalidateTopic();
    callback();
  }, []) ;

  const onChangeSortingMode = useCallback((value: boolean) => {
    setSortingMode(value);
  }, []);

  const OnClickCreateCategory = useCallback(async (data: NewCategoriesDto) => {
    const response = await apis.createCategory(data);
    if(response.status >= 200 && response.status < 300) {
      revalidateTopic(() => {
        router.reload();
      })
    }
  }, [router]);

  const onClickUpdateCategory = useCallback(async (data: CategoriesDto) => {
    const response = await apis.updateCategory(data);
    if(response.status === 200) {
      revalidateTopic(() => {
        router.reload();
      })
    }
  }, [router]);

  const onClickDeleteCategory = useCallback(async (categoryId: number) => {
    const response = await apis.deleteCategory(categoryId);
    if(response.status === 200) {
      revalidateTopic(() => {
        router.reload();
      })
    }
  }, [router]);

  const onClickMoveCategory = useCallback(async (from: number, to: number) => {
    const response = await apis.swapCategoryOrder(categories[from].id, categories[to].id);
    if(response.status < 300) {
      revalidateTopic(() => {
        router.reload();
      })
    }
  }, [categories, router]);

  const OnClickCreateTopic = useCallback(async (data: NewTopicsDto) => {
    const response = await apis.createTopic(data);
    if(response.status >= 200 && response.status < 300) {
      const topicId = response.data.id;
      revalidateTopic(() => {        
        router.reload();
      })
    }
  }, [router]);

  const onClickUpdateTopic = useCallback(async (data: TopicsDto) => {
    const response = await apis.updateTopic(data);
    if(response.status === 200) {
      revalidateTopic(() => {
        router.reload();
      })
    }
  }, [router]);

  const onClickDeleteTopic = useCallback(async (topicId: number) => {
    const response = await apis.deleteTopic(topicId);
    if(response.status === 200) {
      revalidateTopic(() => {
        router.reload();
      })
    }
  }, [router]);

  const onChangeNewCategoryName = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setNewCategoryName(e.target.value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header} >
        <CheckBox label='순서 설정' value={isSortingMode} onChange={onChangeSortingMode} />
      </div>
      
      {categories.map((category, i) => (
        <CategoryEditItem key={category.id}
          category={category}
          categoryIdx={i}
          isLast={Boolean(categories.length-1 === i)}
          onClickUpdateCategory={onClickUpdateCategory}
          onClickDeleteCategory={onClickDeleteCategory}
          onClickMoveCategory={onClickMoveCategory}
          onClickCreateTopic={OnClickCreateTopic}
          onClickUpdateTopic={onClickUpdateTopic}
          onClickDeleteTopic={onClickDeleteTopic}
          revalidateTopic={revalidateTopic}
        />
      ))}
      <div className={styles['new-category']} >
        <input type='text' className={styles['new-category']} placeholder='새 카테고리 이름을 입력하세요.' value={newCategoryName} onChange={onChangeNewCategoryName} />
        <AddBox onClickCreate={OnClickCreateCategory} data={newCategory} />
      </div>
    </div>
  );
};