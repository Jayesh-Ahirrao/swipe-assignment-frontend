import { v4 } from 'uuid';

// use this when everything is working properly
const generateRandomId = () => {
  return v4();
};

// const generateRandomId = () => {
//   const randomNumber = Math.floor(Math.random() * 100);

//   return randomNumber;
// };

export default generateRandomId;
