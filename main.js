
function printReceipt(barcodes) {
  let receipt = createReceipt(barcodes);

  let renderedReceipt = renderReceipt(receipt);

  console.info(renderedReceipt);
}

function renderReceipt(receipt) {
  let rowSep = '------------------------------------------------------------\n';
  let renderedReceipt = 'Receipts\n' + rowSep;

  let colSep = '    ';
  receipt.receiptItems.forEach(item => {
    renderedReceipt += (item.name + colSep + item.totalPrice + colSep + item.quantity + '\n');
  });

  renderedReceipt += rowSep;

  renderedReceipt += ('Price: ' + receipt.price);

  return renderedReceipt;
}

function createReceipt(barcodes) {
  let productDict = {};
  loadAllProduct().forEach(product => {
    productDict[product.id] = product;
  });

  if (barcodes.some(barcode => !(barcode in productDict))) {
    throw new Error('invalid barcode');
  }

  let barcodeCountDict = countBarcode(barcodes);

  let receipt = {receiptItems: [], price: 0};

  for (let barcode in barcodeCountDict) {
    if (productDict.hasOwnProperty(barcode)) {
      let productName = productDict[barcode].name;
      let productQuantity = barcodeCountDict[barcode];
      let productTotalPrice = productDict[barcode].price * productQuantity;
      let receiptItem = {
        name: productName,
        totalPrice: productTotalPrice,
        quantity: productQuantity
      };
      receipt.receiptItems.push(receiptItem)
    }
  }

  receipt.receiptItems.forEach(item => receipt.price += item.totalPrice);

  receipt.price = receipt.receiptItems.reduce((tmpPrice, item) => {
    return tmpPrice + item.totalPrice;
  }, 0);

  return receipt;
}

function countBarcode(barcodes) {
  return barcodes.reduce((tmpCountDict, barcode) => {
    if (barcode in tmpCountDict) {
      tmpCountDict[barcode] += 1;
    } else {
      tmpCountDict[barcode] = 1;
    }
    return tmpCountDict;
  }, {});
}

function loadAllProduct() {
  return [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
  ];
}

module.exports = {
  printReceipt,
  renderReceipt,
  createReceipt,
  countBarcode
};