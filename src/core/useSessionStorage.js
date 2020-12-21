import { useState } from 'react';
export default (key, initialValue = '') => {
  const [value, setValue] = useState(() => {
    return JSON.parse(sessionStorage.getItem(key)) || initialValue
  });
  return [value, setValue]
}
