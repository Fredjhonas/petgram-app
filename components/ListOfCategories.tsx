import { memo } from 'react';
import { FlatList } from 'react-native';
import Category from './Category';

interface IListCategoryProps {
  categories: any[];
  loading: boolean;
}

const ListOfCategoriesComponent = (props: IListCategoryProps) => {
  return (
    <FlatList
      style={{ marginTop: 20 }}
      data={props.categories}
      horizontal
      renderItem={({ item }) => <Category {...item} path={`/pet/${item.id}`} />}
    />
  );
};

export const ListOfCategories = memo(ListOfCategoriesComponent);
