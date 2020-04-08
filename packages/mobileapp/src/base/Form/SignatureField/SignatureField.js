import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import Button from '../../Button/index';
import {useField} from 'formik';

function resetField(signField, helpers, setClean) {
  signField.resetImage();
  helpers.setValue('');
  setClean(true);
}

function saveField(signField) {
  signField.saveImage();
}

function handleSave({encoded}, helpers) {
  helpers.setValue(encoded);
}

const SignatureField = props => {
  const signField = useRef();
  const [clean, setClean] = useState(true);
  const [, , helpers] = useField({name: props.name});

  const handleDrag = () => {
    setClean(false);
  };

  return (
    <View style={styles.container}>
      <SignatureCapture
        style={styles.signature}
        showNativeButtons={false}
        showTitleLabel={true}
        viewMode="portrait"
        ref={signField}
        onSaveEvent={values => {
          handleSave(values, helpers);
        }}
        onDragEvent={handleDrag}
      />
      <View style={styles.buttonRow}>
        <View style={styles.button}>
          <Button
            text="Reset signature"
            style={styles.button}
            onPress={() => {
              resetField(signField.current, helpers, setClean);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            text="Set signature"
            style={styles.button}
            onPress={() => {
              saveField(signField.current, helpers);
            }}
            disabled={clean === true}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signature: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default SignatureField;
