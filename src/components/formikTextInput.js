import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FormikInput = ({
  label,
  field,      // formik field
  form,       // formik form
  ...props
}) => {
  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        value={field.value}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        style={[styles.input, hasError && styles.errorInput]}
        {...props}
      />

      {hasError && (
        <Text style={styles.errorText}>
          {form.errors[field.name]}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { marginBottom: 5, fontSize: 14 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  errorInput: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
});

export default FormikInput;
