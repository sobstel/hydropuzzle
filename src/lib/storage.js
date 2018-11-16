import { AsyncStorage } from 'react-native';

const NAMESPACE = '1@HYDROPUZZLE_2_0:';

export const saveGame = (name, value) => {
  AsyncStorage.setItem(`${NAMESPACE}${name}`, JSON.stringify(value));
};

export const loadGame = async (name) => {
  const serializedValue = await AsyncStorage.getItem(`${NAMESPACE}${name}`);
  return JSON.parse(serializedValue);
};
