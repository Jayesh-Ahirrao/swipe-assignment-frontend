import { v4 } from 'uuid';
/**
 * Using uuid to avod duplicaitons
 * @returns uuid 
 */
const generateRandomId = () => {
  return v4();
};

// const generateRandomId = () => {
//   const randomNumber = Math.floor(Math.random() * 100);

//   return randomNumber;
// };

export default generateRandomId;
