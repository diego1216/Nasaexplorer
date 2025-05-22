import React from 'react'; // Importa React para usar JSX y componentes funcionales
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native'; // Importa componentes nativos de React Native
import { useForm, Controller, useFieldArray } from 'react-hook-form'; // Importa hooks de react-hook-form para manejo de formularios
import { useNavigation } from '@react-navigation/native'; // Hook para navegación dentro del stack
import type { DrawerNavigationProp } from '@react-navigation/drawer'; // Tipado para navegación tipo Drawer
import type { DrawerParamList } from '../../navigation/DrawerNavigator'; // Importa el tipo que define las rutas del Drawer
import ZoomInView from '../components/ZoomInView'; // Componente animado para entrada con efecto de zoom

// Define la estructura de datos que manejará el formulario
type FeedbackForm = {
  name: string; // Campo de nombre
  email: string; // Campo de correo electrónico
  feedbacks: { comment: string }[]; // Arreglo dinámico de comentarios
};

const FeedbackFormScreen = () => {
  // Hook de navegación tipado específicamente para el drawer y la pantalla "Formulario"
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList, 'Formulario'>>();

  // Hook principal del formulario, con valores por defecto definidos
  const {
    control, // Objeto de control para inputs
    handleSubmit, // Función para manejar el envío del formulario
    formState: { errors }, // Acceso a errores de validación
  } = useForm<FeedbackForm>({
    defaultValues: {
      name: '',
      email: '',
      feedbacks: [{ comment: '' }], // Inicia con un comentario vacío
    },
  });

  // Hook para manejar campos dinámicos del array "feedbacks"
  const { fields, append, remove } = useFieldArray({
    control, // Vincula con el control del formulario
    name: 'feedbacks', // Nombre del campo a controlar como arreglo
  });

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data: FeedbackForm) => {
    console.log('Datos del formulario:', data); // Muestra los datos en consola
    navigation.navigate('Apod'); // Redirige a la pantalla "Apod"
  };

  return (
    <ZoomInView style={styles.container}> {/* Contenedor principal animado */}
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

// Estilos de la pantalla
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

// Exporta el componente para usarlo en el sistema de navegación
export default FeedbackFormScreen;
