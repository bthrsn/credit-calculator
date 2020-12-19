const validateField = (field, setValue) => {
  let int = parseFloat(field);
  
  // if (field === null) {
  //   setValue(int);
  //   return false;
  // } else 
  if (field === '' || field === 0 || field === null) {
    setValue({ error: "Введите значение" });
    return false;
  } else if (isNaN(int)) {
    setValue({ error: "Вводите только цифры" });
    return false;
  } else {
    setValue(int);
    return true;
  }
}

export default validateField;