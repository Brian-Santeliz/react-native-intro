import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function App() {
  const [value, setValue] = React.useState('');
  const [names, setNames] = React.useState([]);
  const handleSubmitNames = () => {
    if (value.trim === '' || !value) {
      alert('Debes ingregar un nombre');
      return;
    }
    const isRepeted = names.includes(value);
    if (isRepeted) {
      return alert('No pudes escribir dos nombres iguales');
    }
    setNames((prev) => [...prev, value]);
    setValue('');
  };
  const deleteName = (nameToDelete) => {
    const newNames = names.filter((name) => name !== nameToDelete);
    setNames(newNames);
  };
  const handleDelete = (nameToDelete) => {
    Alert.alert(
      `¿Estás seguro en eliminar este nombre: ${nameToDelete}?`,
      'Despúes de eliminar no se podra recuperar',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Eliminar', onPress: () => deleteName(nameToDelete) },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <Text>Agrega nombres a la lista</Text>
      <TextInput
        style={styles.input}
        value={value}
        placeholder='Empieza a escribir'
        onChangeText={(e) => setValue(e)}
      />
      <Button color='green' title='agregar' onPress={handleSubmitNames} />
      <View style={{ marginVertical: 4 }}>
        <Button
          color='red'
          title='eliminar todos'
          style
          onPress={() => setNames([])}
        />
      </View>
      <StatusBar style='auto' />
      <View>
        {names.length ? (
          names.map((name) => {
            return (
              <TouchableOpacity key={name} onPress={() => handleDelete(name)}>
                <Text style={styles.listNames}>{name}</Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text>Empieza agregar nombres</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 3,
  },
  listNames: {
    fontSize: 39,
  },
});
