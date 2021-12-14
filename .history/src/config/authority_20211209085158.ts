import AsyncStorage from '@react-native-community/async-storage';

export function setAuthority(authority: string) {
  const proAuthority =
    typeof authority === 'string'
      ? authority.split(',')
      : typeof authority === 'undefined'
        ? null
        : authority;

  write('sword-authority', JSON.stringify(proAuthority));
}

export function getToken() {
  return read('sword-token') || '';
}

export function setToken(token: string) {
  write('sword-token', token);
}

export function getAccessToken() {
  const re = read('sword-access-token');
  return re;
}

export function setAccessToken(accessToken: string) {
  write('sword-access-token', accessToken);
}

export function getReflushToken() {
  const re = read('sword-reflush-token');
  return re;
}

export function setReflushToken(accessToken: string) {
  write('sword-reflush-token', accessToken);
}


export function setCurrentUser(account) {
  write('sword-current-user', JSON.stringify(account));
}

export function getCurrentUser() {
  return read('sword-current-user').then((result) => {
    if (result) {
      return JSON.parse(result);
    }
    return {};
  });
}

export function getVerificateUser() {
  return read('verificate-current-user').then((result) => {
    if (result) {
      return result;
    }
    return '';
  });
}

export function setVerificateUser(id: string) {
  write('verificate-current-user', id);
}


export function setCaptchaKey(key: string) {
  remove('sword-captcha-key');
  write('sword-captcha-key', key);
}

export function getCaptchaKey() {
  return read('sword-captcha-key');
}

export function removeAll() {
  AsyncStorage.removeItem('sword-authority');
  AsyncStorage.removeItem('sword-token');
  AsyncStorage.removeItem('sword-top-menus');
  AsyncStorage.removeItem('sword-routes');
  AsyncStorage.removeItem('sword-buttons');
  AsyncStorage.removeItem('sword-current-user');
  AsyncStorage.removeItem('sword-captcha-key');
  AsyncStorage.removeItem('verificate-current-user');
}

const read = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) { }
  return '';
};

const write = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // save error
  }
};


const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) { }
};
