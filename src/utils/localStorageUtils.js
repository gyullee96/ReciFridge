/**
 * localStorage에 데이터를 JSON 문자열 형태로 저장.
 * @param {string} key - 데이터를 저장할 키
 * @param {any} value - 저장할 값 (객체, 배열 등)
 * @returns {boolean} 저장 성공 여부
 */
export const saveJSONToLocalStorage = (key, value) => {
  if (typeof window === 'undefined') {
    console.error('localStorage is not available in this environment.');
    return false;
  }
  try {
    const stringifiedValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringifiedValue);
    return true;
  } catch (error) {
    console.error(`에러에러 "${key}":`, error);
    return false;
  }
};

/**
 * localStorage에서 키에 해당하는 데이터를 불러와 JSON 객체로 파싱합니다.
 * @param {string} key - 불러올 데이터의 키
 * @returns {any | null} 불러온 데이터 (파싱된 객체) 또는 null (키가 없거나 오류 발생 시)
 */
export const loadJSONFromLocalStorage = (key) => {
  if (typeof window === 'undefined') {
    console.error('로컬스토리지 사용 불가능');
    return null;
  }
  try {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue === null) {
      // 키에 해당하는 값이 없으면 null 반환
      return null;
    }
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`불러올수가 없네... "${key}":`, error);
    return null;
  }
};

/**
 * localStorage에서 특정 키의 데이터를 삭제합니다.
 * @param {string} key - 삭제할 데이터의 키
 * @returns {boolean} 삭제 성공 여부
 */
export const removeDataFromLocalStorage = (key) => {
  if (typeof window === 'undefined') {
    console.error('localStorage is not available in this environment.');
    return false;
  }
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data from localStorage for key "${key}":`, error);
    return false;
  }
};
