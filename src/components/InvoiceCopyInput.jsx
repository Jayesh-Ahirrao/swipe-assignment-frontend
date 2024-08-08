import React, { useCallback, useState } from 'react'
import { Button } from 'react-bootstrap';

const InvoiceCopyInput = ({ invoiceList, handleCopyClick }) => {
    const [copyId, setCopyId] = useState("");

    const handleOnChange = useCallback((event) => {
        setCopyId(event.target.value);
    }, []);

    return (
        <div className='d-flex align-items-center'>
            <Button variant="dark md-4" onClick={() => handleCopyClick(copyId)}>
                Copy Invoice
            </Button>
            <input
                list="copyInvoiceInput"
                type="text"
                value={copyId}
                onChange={handleOnChange}
                placeholder="Enter Invoice ID to copy"
                className="bg-white border mx-2 "
                style={{
                    height: "50px",
                }}
            />
            <datalist id="copyInvoiceInput">
                {invoiceList &&
                    invoiceList.map((invoice) => <option key={invoice.id} value={invoice.id}></option>)
                }
            </datalist>
        </div>
    )
}

export default React.memo(InvoiceCopyInput);