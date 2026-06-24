import AsyncStorage from "@react-native-async-storage/async-storage";

const memoryCache = new Map<string, any>();

export const fetchAndCacheLottie = async (url: string): Promise<any> => {
  if (memoryCache.has(url)) {
    return memoryCache.get(url);
  }
  
  try {
    const cachedString = await AsyncStorage.getItem(`lottie_${url}`);
    if (cachedString) {
      const data = JSON.parse(cachedString);
      memoryCache.set(url, data);
      return data;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    memoryCache.set(url, data);
    await AsyncStorage.setItem(`lottie_${url}`, JSON.stringify(data));
    
    return data;
  } catch (error) {
    if (__DEV__) console.warn("Failed to fetch lottie", error);
    return null;
  }
};
