import {useAsyncStorage} from '@react-native-async-storage/async-storage';
const {getItem, setItem} = useAsyncStorage('@data_contact');

const readItemFromStorage = async (setValue: any) => {
  const item: any = await getItem();
  setValue(JSON.parse(item));
};

const writeItemToStorage = async (data: any) => {
  const jsonValue = JSON.stringify(data);
  await setItem(jsonValue);
};

export {readItemFromStorage, writeItemToStorage};
