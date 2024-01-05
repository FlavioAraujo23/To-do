import { validateEmail, validatePassword } from "./regexForValidate";

export default function validateForm(email, password){
  const emailIsValidate = validateEmail.test(email);
  const passwordIsValidate = validatePassword.test(password);
  return {emailIsValidate, passwordIsValidate}
}