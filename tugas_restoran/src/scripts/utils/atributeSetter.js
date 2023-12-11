/* eslint-disable no-param-reassign *//* eslint-disable linebreak-style */

const attributeSetter = (element, className, id) => {
  element.classList.add(className);
  element.id = id || className;
  element.setAttribute('tabindex', '0');
};
export default attributeSetter;
