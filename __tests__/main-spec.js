const main = require('../main');

it ('should return count of barcode correctly when count barcode given [0001, 0002, 0001]', () => {
  let barcodes = ['0001', '0002', '0001'];
  let outputBarcodeCount = main.countBarcode(barcodes);

  expect(outputBarcodeCount).toEqual({
    '0001': 2,
    '0002': 1
  });
});