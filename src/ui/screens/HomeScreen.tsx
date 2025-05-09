import React, { useState, useEffect } from "react";
import {View,Text,Image,ActivityIndicator,ScrollView,StyleSheet,Dimensions,Button,Platform,} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAstronomyViewModel } from "../../presentation/viewmodels/useApodViewModel";
import { WebView } from "react-native-webview";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { width } = Dimensions.get("window");
export const HomeScreen = ({ navigation }: Props) => {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const { picture, loading, getPicture } = useAstronomyViewModel();

  useEffect(() => {
    if (selectedDate) {
      getPicture(selectedDate);
    }
  }, [selectedDate]);

  const onChange = (event: any, selected?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selected) {
      setDate(selected);
      const formatted = selected.toISOString().split("T")[0]; // yyyy-mm-dd
      setSelectedDate(formatted);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Seleccionar Fecha" onPress={() => setShowPicker(true)} />
      <Button title="Ver Asteroides Cercanos" onPress={() => navigation.navigate('Asteroids')}/>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0077ff" />
        </View>
      ) : !picture ? (
        <View style={styles.center}>
          <Text>Error cargando la imagen del día.</Text>
        </View>
      ) : (
        <>
          <Text style={styles.title}>{picture.title}</Text>

          {picture.media_type === "image" ? (
            <Image source={{ uri: picture.url }} style={styles.image} />
          ) : (
            <WebView
              source={{ uri: picture.url }}
              style={styles.webview}
              allowsFullscreenVideo
            />
          )}

          <Text style={styles.explanation}>{picture.explanation}</Text>
          <Text style={styles.date}>{picture.date}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f1f5f9",
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1e293b",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 12,
  },
  webview: {
    height: 300,
    width: width - 32,
    borderRadius: 8,
    marginBottom: 12,
  },
  explanation: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 22,
    marginBottom: 20,
  },
  date: {
    textAlign: "right",
    fontSize: 14,
    color: "#64748b",
  },
});
