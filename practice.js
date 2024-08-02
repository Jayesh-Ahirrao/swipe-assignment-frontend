// export  const formdata ={
//     "id": 41,
//     "currentDate": "8/2/2024",
//     "invoiceNumber": 3,
//     "dateOfIssue": "2024-08-29",
//     "billTo": "Jayesh Ahirrao",
//     "billToEmail": "ahirraojayesh88@gmail.com",
//     "billToAddress": "44, shri nivas bhau nagar, kajgaon road, New new post office",
//     "billFrom": "Jayesh Ahirrao",
//     "billFromEmail": "ahirraojayesh88@gmail.com",
//     "billFromAddress": "44, shri nivas bhau nagar, kajgaon road, New new post office",
//     "notes": "",
//     "total": "4.32",
//     "subTotal": "4.00",
//     "taxRate": "8",
//     "taxAmount": "0.32",
//     "discountRate": "0.03",
//     "discountAmount": "0.00",
//     "currency": "₿",
//     "items": [
//         {
//             "itemId": 0,
//             "itemName": "XYZ",
//             "itemDescription": "asd",
//             "itemPrice": "4",
//             "itemQuantity": 1
//         }
//     ]
// }

// // const [currItem, setCurrItem] = useState({
// //     id: "",
// //     name: "",
// //     description: "",
// //     price: "",
// //     category: ""
// //   });



// /*
// const ItemRow = (props) => {
//   const onDelEvent = () => {
//     props.onDelEvent(props.item);
//   };
//   return (
//     <tr>
//       <td style={{ width: "100%" }}>
//         <EditableField
//           onItemizedItemEdit={(evt) =>
//             props.onItemizedItemEdit(evt, props.item.itemId)
//           }
//           cellData={{
//             type: "text",
//             name: "itemName",
//             placeholder: "Item name",
//             value: props.item.itemName,
//             id: props.item.itemId,
//           }}
//         />
//         <EditableField
//           onItemizedItemEdit={(evt) =>
//             props.onItemizedItemEdit(evt, props.item.itemId)
//           }
//           cellData={{
//             type: "text",
//             name: "itemDescription",
//             placeholder: "Item description",
//             value: props.item.itemDescription,
//             id: props.item.itemId,
//           }}
//         />
//       </td>
//       <td style={{ minWidth: "70px" }}>
//         <EditableField
//           onItemizedItemEdit={(evt) =>
//             props.onItemizedItemEdit(evt, props.item.itemId)
//           }
//           cellData={{
//             type: "number",
//             name: "itemQuantity",
//             min: 1,
//             step: "1",
//             value: props.item.itemQuantity,
//             id: props.item.itemId,
//           }}
//         />
//       </td>
//       <td style={{ minWidth: "130px" }}>
//         <EditableField
//           onItemizedItemEdit={(evt) =>
//             props.onItemizedItemEdit(evt, props.item.itemId)
//           }
//           cellData={{
//             leading: props.currency,
//             type: "number",
//             name: "itemPrice",
//             min: 1,
//             step: "0.01",
//             presicion: 2,
//             textAlign: "text-end",
//             value: props.item.itemPrice,
//             id: props.item.itemId,
//           }}
//         />
//       </td>
//       <td className="text-center" style={{ minWidth: "50px" }}>
//         <BiTrash
//           onClick={onDelEvent}
//           style={{ height: "33px", width: "33px", padding: "7.5px" }}
//           className="text-white mt-1 btn btn-danger"
//         />
//       </td>
//     </tr>
//   );
// };
// */