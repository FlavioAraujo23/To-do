import { validateInputs } from './regexForValidate';

export default function validateFormInputs(title, member, description) {

  const titleValidate = validateInputs.test(title);
  const memberValidate = validateInputs.test(member);
  const descriptionValidate = validateInputs.test(description);
  
  if(!titleValidate && !memberValidate && !descriptionValidate) {
    return true;
  } else {
    return false
  }
}