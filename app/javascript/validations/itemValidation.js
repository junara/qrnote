import errorMessage from 'errorMessage'

export default itemValidation = (values) => {
  let errors = {}
    if (values.name === '') errors.name = errorMessage.required
  return errors
}
