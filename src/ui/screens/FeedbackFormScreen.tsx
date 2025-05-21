import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import ZoomInView from '../components/ZoomInView';

type FeedbackForm = {
  name: string;
  email: string;
  feedbacks: { comment: string }[];
};

const FeedbackFormScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Formulario'>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackForm>({
    defaultValues: {
      name: '',
      email: '',
      feedbacks: [{ comment: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'feedbacks',
  });

  const onSubmit = (data: FeedbackForm) => {
    console.log('Datos del formulario:', data);
    // ✅ Regresa a APOD
    navigation.navigate('Apod');
  };

  return (
    <ZoomInView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={styles.label}>Nombre</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Este campo es obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} onChangeText={onChange} value={value} />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Text style={styles.label}>Correo electrónico</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Correo requerido',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Correo inválido',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        <Text style={styles.label}>Comentarios</Text>
        {fields.map((field, index) => (
          <View key={field.id} style={styles.commentContainer}>
            <Controller
              control={control}
              name={`feedbacks.${index}.comment`}
              rules={{ required: 'Comentario requerido' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder={`Comentario #${index + 1}`}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Button title="Eliminar" onPress={() => remove(index)} />
          </View>
        ))}
        <Button title="Agregar comentario" onPress={() => append({ comment: '' })} />

        <View style={{ marginTop: 20 }}>
          <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </ZoomInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  label: {
    fontSize: 16,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  commentContainer: {
    marginBottom: 10,
  },
});

export default FeedbackFormScreen;
