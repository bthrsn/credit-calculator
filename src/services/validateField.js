const validateField = (field, setValue) => {
  let int = parseFloat(field);
  
  // if (field === '' || field === 0) {
  //   setValue({ ...field.values, error: "Введите значение" });
  //   return false;
  // } else 
  if (isNaN(int)) {
    setValue({ ...field.values, error: "Вводите только цифры" });
    return false;
  } else {
    setValue(int);
    return true;
  }
}

export default validateField;