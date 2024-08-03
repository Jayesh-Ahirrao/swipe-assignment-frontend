import React, { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import { CATEGORIES } from "../constants/categories";
import SelectBasicExample from "../UI/Select";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useProductListData } from "../redux/hooks";

const options = [CATEGORIES.GOODS, CATEGORIES.SERVICES];

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency, onRowDel, items = [], onRowAdd } = props;
  const { productsList } = useProductListData();



  const itemTable = items.map((item, index) => (
    <ItemRow
      key={index} //using it as we have no option for empty arrays
      item={item}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
    />
  ));

  const handleProductAdd = useCallback((id) => {
    // using lose equality because our product could be int.
    // this will be updated when high priority tasks are completed
    const selectedProduct = productsList.find(product => product.id == id);

    if(selectedProduct) {
      onRowAdd(selectedProduct);
    }

  } ,[]);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>

      <Dropdown as={ButtonGroup} onSelect={handleProductAdd}>

        <Button className="fw-bold" onClick={() =>  onRowAdd()}>
          Add Item
        </Button>
        <Dropdown.Toggle variant="warning" split id="dropdown-custom-2" />
        <Dropdown.Menu>
          {
            productsList.map(product => <Dropdown.Item id={product.id} eventKey={product.id}>{product.name}</Dropdown.Item>)
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const ItemRow = (props) => {
  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };
  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemName",
            placeholder: "Item name",
            value: props.item.itemName,
            id: props.item.itemId,
          }}
        />
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemDescription",
            placeholder: "Item description",
            value: props.item.itemDescription,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: props.item.itemQuantity,
            id: props.item.itemId,
          }}
        />

      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            leading: props.currency,
            type: "number",
            name: "itemPrice",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: props.item.itemPrice,
            id: props.item.itemId,
          }}
        />

        <SelectBasicExample
          name="category"
          options={options}
          value={props.item.category} onItemizedItemEdit={(evt) => props.onItemizedItemEdit(evt, props.item.itemId)} />

      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
