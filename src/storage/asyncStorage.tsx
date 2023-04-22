import {useAsyncStorage} from '@react-native-async-storage/async-storage';
const {getItem, setItem} = useAsyncStorage('@data_contact');

const readItemFromStorage = async setValue => {
  const item = await getItem();
  setValue(JSON.parse(item));
};

const writeItemToStorage = async data => {
  const jsonValue = JSON.stringify(data);
  await setItem(jsonValue);
};

export {readItemFromStorage, writeItemToStorage};
