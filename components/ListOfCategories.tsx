import { memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Category from './Category';

interface IListCategoryProps {
  categories: any[];
  loading: boolean;
}

const ListOfCategoriesComponent = (props: IListCategoryProps) => {
  return (
    <FlatList
      style={styles.container}
      data={props.categories}
      horizontal
      renderItem={({ item }) => <Category {...item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 10,
    height: 180,
  }
})

export const ListOfCategories = memo(ListOfCategoriesComponent);
