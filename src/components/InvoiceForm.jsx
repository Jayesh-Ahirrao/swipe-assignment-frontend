import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { addInvoice, updateInvoice } from "../redux/invoicesSlice";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import generateRandomId from "../utils/generateRandomId";
import { useExchangeRatesData, useInvoiceListData, useProductListData } from "../redux/hooks";
import GoToButton from "../UI/GoToButton";
import { validateInvoice } from '../utils/validations';
import showToast from '../utils/showToast.js';
import { TOASTVARIANTS } from '../constants/toastVariants.js';
import { CATEGORIES } from "../constants/categories.js";
import { updateBulkProducts } from "../redux/productsSlice.js";
import { BASE_CURRENCY, BITCOIN_CURRENCY, CURRENCIES_OPTIONS, DECIMAL_PLACES } from "../constants/currencies.js";
import { getCurrencyExchangeRates } from "../redux/exchangeSlice.js";



const InvoiceForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isCopy = location.pathname.includes("create");
  const isEdit = location.pathname.includes("edit");

  const [isOpen, setIsOpen] = useState(false);
  const [copyId, setCopyId] = useState("");
  const { getOneInvoice, listSize, invoiceList } = useInvoiceListData();

  const { rates: exchangeRates } = useExchangeRatesData();
  const { productsList } = useProductListData();


  const [formData, setFormData] = useState({
    id: generateRandomId(),
    currentDate: new Date().toLocaleDateString(),
    invoiceNumber: listSize + 1,
    dateOfIssue: "",
    billTo: "",
    billToEmail: "",
    billToAddress: "",
    billFrom: "",
    billFromEmail: "",
    billFromAddress: "",
    notes: "",
    total: "0.00",
    subTotal: "0.00",
    goodsTotal: "0.00",
    serviceTotal: "0.00",
    taxRate: "",
    taxAmount: "0.00",
    discountRate: "",
    discountAmount: "0.00",
    currency: "$ USD",
    items: [],
  }
  );

  // this useEffect prevents the error when user try to edit invalid invoice
  useEffect(() => {
    if (isEdit || (isCopy && params.id)) {
      const invoice = getOneInvoice(params.id);
      if (!invoice) {
        showToast("Invoice not found");
        navigate('/');
      }
      else if (isEdit) {
        setFormData(invoice);
      } else {
        setFormData({ ...invoice, id: generateRandomId(), invoiceNumber: listSize + 1 });
      }
    }
  }, []);

  useEffect(() => {
    // update the USDPRIce as soon as form is mounted and depend on formdata
    setFormData((prev) => {

      const newItems = prev.items.map((item) => {
        const productIndex = productsList.findIndex((product) => item.itemId == product.id);

        return {
          ...item,
          USDPrice: productsList[productIndex].price,
        }

      });
      return {
        ...prev,
        items : newItems,
      }
    });
  }, [productsList]);



  useEffect(() => {
    dispatch(getCurrencyExchangeRates());
  }, [dispatch]);


  const handleRowDel = (itemToDelete) => {
    const updatedItems = formData.items.filter(
      (item) => item.itemId !== itemToDelete.itemId
    );
    setFormData((prevFormData) => ({ ...prevFormData, items: updatedItems }));
    handleCalculateTotal();
  };

  const handleAddEvent = (selectedProduct = null) => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

    const newItem = {
      itemId: id,
      itemName: "",
      itemDescription: "",
      itemPrice: "1.00",
      itemQuantity: 1,
      category: "", //you can keep goods as a default category
      USDPrice: "",
    };

    // we are utilizing this fn for both user input details and autifill details from existing products
    // because the products obj were designed differently we have to do this mapping
    if (selectedProduct) {
      newItem.itemId = selectedProduct.id;
      newItem.itemName = selectedProduct.name;
      newItem.itemDescription = selectedProduct.description;
      newItem.itemPrice = selectedProduct.price;
      newItem.category = selectedProduct.category;
      newItem.USDPrice = selectedProduct.price;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      items: [...prevFormData.items, newItem],
    }));

    handleCalculateTotal();
  };

  const handleCalculateTotal = () => {

    setFormData((prevFormData) => {
      const dec_plcaes = prevFormData.currency.split(' ')[1] === BITCOIN_CURRENCY ? DECIMAL_PLACES.BITCOIN : DECIMAL_PLACES.CURRENCIES;

      let subTotal = 0;
      // Adding goodsTotal and servicesTotal for grouping of bills
      let goodsTotal = 0;
      let serviceTotal = 0;

      prevFormData.items.forEach((item) => {
        let currCost = parseFloat(item.itemPrice) * parseInt(item.itemQuantity);
        if (item.category === CATEGORIES.GOODS) {
          goodsTotal += currCost;
        } else {
          serviceTotal += currCost;
        }
        subTotal += currCost;
      });

      const taxAmount = parseFloat(subTotal * (prevFormData.taxRate / 100));

      const discountAmount = parseFloat(subTotal * (prevFormData.discountRate / 100));

      const total = (
        subTotal -
        parseFloat(discountAmount) +
        parseFloat(taxAmount)
      )
      return {
        ...prevFormData,
        subTotal: parseFloat(subTotal).toFixed(dec_plcaes),
        serviceTotal: parseFloat(serviceTotal).toFixed(dec_plcaes),
        goodsTotal: parseFloat(goodsTotal).toFixed(dec_plcaes),
        taxAmount,
        discountAmount,
        total: total.toFixed(dec_plcaes),
      };
    });
  };

  const onItemizedItemEdit = (evt, id) => {
    const updatedItems = formData.items.map((oldItem) => {
      if (oldItem.itemId === id) {
        return { ...oldItem, [evt.target.name]: evt.target.value };
      }
      return oldItem;
    });

    setFormData({ ...formData, items: updatedItems });
    handleCalculateTotal();
  };

  const editField = (name, value) => {
    setFormData({ ...formData, [name]: value });
    handleCalculateTotal();
  };

  const onCurrencyChange = (selectedOption) => {
    // calculate the latest rates change from USD to selected currency option
    if (exchangeRates && selectedOption.currency !== BASE_CURRENCY) {

      const currencySymbol = selectedOption.currency.split(' ')[1];
      let dec_plcaed = currencySymbol === BITCOIN_CURRENCY ? DECIMAL_PLACES.BITCOIN : DECIMAL_PLACES.CURRENCIES;

      setFormData((prev) => {
        const updatesItems = prev.items.map((item) => {
          const newPrice = (parseFloat(item.USDPrice) * exchangeRates[currencySymbol]).toFixed(dec_plcaed);

          return {
            ...item,
            itemPrice: newPrice,
          }
        });
        return {
          ...prev,
          items: updatesItems,
          currency: selectedOption.currency
        }
      });
    } else {
      setFormData((prev) => {
        const updatedItems = prev.items.map((item) => {
          return {
            ...item,
            itemPrice: item.USDPrice
          }
        });

        return {
          ...prev,
          items: updatedItems,
          currency: selectedOption.currency
        }
      });
    }
    handleCalculateTotal();
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddInvoice = () => {
    const res = validateInvoice(formData, invoiceList);
    if (!res.passed) {
      showToast(res.message);
      return;
    }

    // Moving this outside to avoind performing split in each loop
    const currencySymbol = formData.currency.split(" ")[1];

    // do mapping of items to products syntax
    const bulkUpdatingProducts = formData.items.map((item) => {
      let PriceInUSD = parseFloat(item.itemPrice);

      if (formData.currency !== BASE_CURRENCY && exchangeRates) {
        // convert price back to base currency for data inside product to be consistent
        const rate = exchangeRates[currencySymbol];
        const dec_plcaes = formData.currency.split(" ")[1] === BITCOIN_CURRENCY ? DECIMAL_PLACES.BITCOIN : DECIMAL_PLACES.CURRENCIES

        if (rate) {
          PriceInUSD = (PriceInUSD / rate).toFixed(dec_plcaes);
        }

      }
      console.log("Price in uUSD", PriceInUSD);

      return {
        name: item.itemName,
        id: item.itemId,
        description: item.itemDescription,
        price: PriceInUSD,
        category: item.category
      }
    });

    dispatch(updateBulkProducts({ bulkUpdatingProducts, exchangeRates }));

    if (isEdit) {
      dispatch(updateInvoice({ id: params.id, updatedInvoice: formData }));
      showToast("Invoice updated successfuly 🥳", TOASTVARIANTS.success);
    } else if (isCopy) {
      dispatch(addInvoice({ id: generateRandomId(), ...formData }));
      showToast("Invoice added successfuly 🥳", TOASTVARIANTS.success);
    } else {
      dispatch(addInvoice(formData));
      showToast("Invoice added successfuly 🥳", TOASTVARIANTS.success);
    }

    handleCalculateTotal();
    navigate("/");
  };

  const handleCopyInvoice = () => {
    const recievedInvoice = getOneInvoice(copyId);
    if (recievedInvoice) {
      setFormData({
        ...recievedInvoice,
        id: formData.id,
        invoiceNumber: formData.invoiceNumber,
      });
    } else {
      showToast("Invoice does not exists!!!!!");
    }
  };

  return (
    <Form onSubmit={openModal}>
      <GoToButton url={'/'} text={'Go Back'} />

      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{formData.currentDate}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={formData.dateOfIssue}
                    name="dateOfIssue"
                    onChange={(e) => editField(e.target.name, e.target.value)}
                    style={{ maxWidth: "150px" }}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={formData.invoiceNumber}
                  name="invoiceNumber"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  min="1"
                  style={{ maxWidth: "70px" }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder="Who is this invoice to?"
                  rows={3}
                  value={formData.billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Email address"
                  value={formData.billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder="Billing address"
                  value={formData.billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder="Who is this invoice from?"
                  rows={3}
                  value={formData.billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Email address"
                  value={formData.billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder="Billing address"
                  value={formData.billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  required
                />
              </Col>
            </Row>

            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={formData.currency}
              items={formData.items}
            />

            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {formData.currency}{":  "}
                    {formData.subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small">
                      ({formData.discountRate || 0}%){" "}
                    </span>
                    {formData.currency}{": "}
                    {formData.discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small">({formData.taxRate || 0}%){" "}</span>
                    {formData.currency}{":  "}
                    {formData.taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{ fontSize: "1.125rem" }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {formData.currency}{":  "}
                    {formData.total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={formData.notes}
              onChange={(e) => editField(e.target.name, e.target.value)}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button
              variant="dark"
              onClick={handleAddInvoice}
              className="d-block w-100 mb-2"
            >
              {isEdit ? "Update Invoice" : "Add Invoice"}
            </Button>
            <Button variant="primary" type="submit" className="d-block w-100">
              Review Invoice
            </Button>
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                isOpen,
                id: formData.id,
                currency: formData.currency,
                currentDate: formData.currentDate,
                invoiceNumber: formData.invoiceNumber,
                dateOfIssue: formData.dateOfIssue,
                billTo: formData.billTo,
                billToEmail: formData.billToEmail,
                billToAddress: formData.billToAddress,
                billFrom: formData.billFrom,
                billFromEmail: formData.billFromEmail,
                billFromAddress: formData.billFromAddress,
                notes: formData.notes,
                total: formData.total,
                subTotal: formData.subTotal,
                taxRate: formData.taxRate,
                taxAmount: formData.taxAmount,
                discountRate: formData.discountRate,
                discountAmount: formData.discountAmount,
              }}
              items={formData.items}
              currency={formData.currency}
              subTotal={formData.subTotal}
              taxAmount={formData.taxAmount}
              goodsTotal={formData.goodsTotal}
              serviceTotal={formData.serviceTotal}
              categoryTotal={formData.categoryTotal}
              discountAmount={formData.discountAmount}
              total={formData.total}
            />
            <Form.Group className="mb-3">
              {/* TODO: Currency exchange Move this to constants*/}
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(event) =>
                  onCurrencyChange({ currency: event.target.value })
                }
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                {
                  CURRENCIES_OPTIONS.map((currency) => {
                    return (
                      <option value={currency.symbol} key={currency.symbol}>{currency.name}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={formData.taxRate}
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={formData.discountRate}
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Control
              placeholder="Enter Invoice ID"
              name="copyId"
              value={copyId}
              onChange={(e) => setCopyId(e.target.value)}
              type="text"
              className="my-2 bg-white border"
            />
            <Button
              variant="primary"
              onClick={handleCopyInvoice}
              className="d-block"
            >
              Copy Old Invoice
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
