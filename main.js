
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

module.exports = {
  countBarcode
};