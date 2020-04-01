import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProductPickerItem from './ProductPickerItem/index';
import Title from '../../Title/index';

const ProductPicker = ({values, handleChange, placeholder}) => {
  return (
    <View>
      {values.items.map((category, i) => {
        return (
          <View
            key={`category-${i}`}
            //Avoid applying these styles to the first element.
            style={i !== 0 && styles.categoryContainer}>
            <Title extraStyles={styles.title}>{category.name}</Title>
            {category.items.map((item, j) => {
              // Rows are of length 2 and rendered in pair, so when an odd item comes in the loop it is
              // skipped because it has already been rendered when the previous item came.
              if (j % 2 !== 0) {
                return;
              }
              return (
                <View style={styles.container} key={`topfield-${j}`}>
                  <ProductPickerItem
                    text={values.items[i].items[j].name}
                    value={values.items[i].items[j].qty}
                    placeholder={placeholder}
                    handleChange={handleChange(`items[${i}].items[${j}].qty`)}
                  />
                  {values.items[i].items.length > j + 1 ? (
                    <ProductPickerItem
                      text={values.items[i].items[j + 1].name}
                      value={values.items[i].items[j + 1].qty}
                      placeholder={placeholder}
                      handleChange={handleChange(
                        `items[${i}].items[${j + 1}].qty`,
                      )}
                    />
                  ) : (
                    <View style={styles.column} />
                  )}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  categoryContainer: {
    marginTop: 50,
  },
  title: {
    marginBottom: 15,
  },
});
export default ProductPicker;
