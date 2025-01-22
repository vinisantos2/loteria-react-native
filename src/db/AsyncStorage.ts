import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e)
  }
};

export const limparBanco = async () => {
  AsyncStorage.clear()
}

export const deletar = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log(e)
  }

}

export const getData = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const objJson = await AsyncStorage.multiGet(allKeys);
    const objetos = []
    objJson.forEach((value, i) => {
      let jogoSalvo = JSON.parse(value[1])
      objetos.push(jogoSalvo)
    })

    return objetos


  } catch (e) {
    // error reading value
  }
};