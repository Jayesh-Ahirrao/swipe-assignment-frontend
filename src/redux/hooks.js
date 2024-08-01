import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import {selectProductList} from './productsSlice';

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
  };
};

export const useProductListData = () => {
  const products = useSelector(selectProductList); 


  return {
    productsList : products.products,
  }
};

