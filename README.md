# 🧾 Invoice Management System
- this is assignment from swipe

## 🌐 Its Live :
- The application is deployed and can be accessed at: [Deployed Invoice Management System](https://swipe-jayesh.vercel.app/)

## 🌟 Features

- 📄 **Invoice Listing**: View all your invoices in a neat table format.
- ✏️ **Edit Invoices**: Easily edit invoice details with a single click.
- 🗑️ **Delete Invoices**: Remove invoices that are no longer needed.
- 👁️ **View Invoice Details**: Open a modal to see detailed information about each invoice.
- 🔄 **Bulk Product Updates**: Update multiple product details at once and reflect changes in all associated invoices.

# 🚀 Getting Started

## ✨ Features added

### 📦 Products
- **New Product tab**
- **CRUD support for products**
- Product updates get updated in all existing invoices
- Input new Products and create them dynamically to track changes in the future
- Can add existing products to invoice directly from **ADD ITEM** button
- Products edited during invoice creation/updations is updated in all invoices including their calculations
- Making components more generic for **Resuability**

### 📄 Invoices
- Grouped them into respective sections
- Separate and combined calculations for groups
- Using **extraReducers** to update the state of invoice for **Separation of concerns**
- Added **Validations** for each field to keep data **Consistent**

## 🐛 Bugs and issues found and now resolved
- Invalid use of HTML at some places
- **ID could be duplicated**
- Preventing user to visit **unhandled routes**
- preventing user to **Edit Invalid Invoice**
- **Invoice number updation**
- Could have had multiple invoices with same number at same time
- Negative values could be taken for prices, taxes, discounts
- Older node version
- etc.
