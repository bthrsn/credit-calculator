import numeral from 'numeral';

  // Добавления пробелов между разрядами
  const addSpacesToValue = (value) => {
    if (value === '' || value === null) {
      return '';
    } else {
      return numeral(value).format('0,0');
    }
  }
  
  // Удаление проблеов между разрядами для подсчета
  const removeSpacesInValue = (value) => {
    return value.replace(/\D/g, '');
  }
  
  export {addSpacesToValue, removeSpacesInValue}
