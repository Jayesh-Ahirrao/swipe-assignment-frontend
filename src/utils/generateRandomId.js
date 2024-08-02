import { v4 } from 'uuid';


const generateRandomId = () => {
  return v4();
};

export default generateRandomId;
