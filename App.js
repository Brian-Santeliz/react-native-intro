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
  const [isEdit, setIsEdit] = React.useState(false);
  const [nameToEdit, setNameToEdit] = React.useState('');
  const handleSubmitNames = () => {
    if (value.trim === '' || !value) {
      alert('Debes ingregar un nombre');
      return;
    }
    const isRepeted = names.includes(value);
    if (isRepeted) {
      return alert('No pudes escribir dos nombres iguales');
    }
    if (!isEdit) {
      setNames((prev) => [...prev, value]);
      setValue('');
    } else {
      names.splice(names.indexOf(nameToEdit), 1, value);
      setValue('');
      setIsEdit(false);
      setNameToEdit('');
    }
  };
  const deleteName = (nameToDelete) => {
    const newNames = names.filter((name) => name !== nameToDelete);
    setNames(newNames);
  };
  const handleAction = (nameToDelete) => {
    Alert.alert(
      `Has seleccionado el nombre ${nameToDelete}`,
      'Selecciona la operación a ejecutar',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Editar',
          onPress: () => {
            setValue(nameToDelete);
            setIsEdit(true);
            setNameToEdit(nameToDelete);
          },
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
      {names.length ? (
        <View style={{ marginVertical: 4 }}>
          <Button
            color='red'
            title='eliminar todos'
            style
            onPress={() => setNames([])}
          />
        </View>
      ) : (
        <Text />
      )}
      <StatusBar style='auto' />
      <View>
        {names.length ? (
          names.map((name) => {
            return (
              <TouchableOpacity key={name} onPress={() => handleAction(name)}>
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
