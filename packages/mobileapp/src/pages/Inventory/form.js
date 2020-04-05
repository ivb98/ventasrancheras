import React from 'react';
import {Formik} from 'formik';
import ProductPicker from '../../base/Form/ProductPicker/index';
import {View} from 'react-native';

const InventoryForm = ({items}) => {
  return (
    <Formik initialValues={{items}} onSubmit={() => {}}>
      {({handleChange, values}) => (
        <View>
          <ProductPicker handleChange={handleChange} values={values} />
        </View>
      )}
    </Formik>
  );
};

export default InventoryForm;
