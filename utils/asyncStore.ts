import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveDataToStorage = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.error('Failed to save data:', error)
  }
}

export const getDataFromStorage = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    } else {
      console.log('No data found for key:', key)
      return null
    }
  } catch (error) {
    console.error('Failed to retrieve data:', error)
    return null
  }
}

export const removeDataFromStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.error('Failed to remove data:', error)
  }
}
