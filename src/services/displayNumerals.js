import numeral from 'numeral';

  const formatValueToString = (value, suffix) => {
    if (value === '' || value === null || value === 0) {
      return '';
    } else {
      return numeral(value).format('0,0') + suffix;
    }
  }

  const formatValueToNumber = (value) => {
    return +value.replace(/\D/g, '');
  }

  export {formatValueToString, formatValueToNumber}
