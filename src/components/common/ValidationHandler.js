const validationHandler = errors => {
  let validations = {};
  Object.keys(errors).map(key => {
    const error = errors[key];
    const field = errors[key]['field'];
    if (validations.hasOwnProperty(field)) {
      return (validations[field] += ', ' + error['detail']);
    } else {
      return (validations[field] =
        errors[key]['field_label'] + ' ' + error['detail']);
    }
  });
  return validations;
};
export default validationHandler;
