const main = require('../main');

// test case of countBarcode

it('should return count of barcode correctly when count barcode given [0001, 0002, 0001]',
    () => {
      let barcodes = ['0001', '0002', '0001'];
      let outputBarcodeCount = main.countBarcode(barcodes);

      expect(outputBarcodeCount).toEqual({
        '0001': 2,
        '0002': 1
      });
    });

//  test case of createReceipt

it('should return receipt object correctly when create receipt given [0001, 0002, 0001]',
    () => {
      let barcodes = ['0001', '0002', '0001'];
      let outputReceipt = main.createReceipt(barcodes);

      expect(outputReceipt).toEqual({
        receiptItems: [
          {
            name: 'Coca Cola',
            totalPrice: 6,
            quantity: 2
          },
          {
            name: 'Diet Coke',
            totalPrice: 4,
            quantity: 1
          }
        ],
        price: 10
      });
    });

it('should throw error when create receipt given non-existing barcode', () => {
  let barcodes = ['aaaa'];
  expect(() => {
    main.createReceipt(barcodes);
  }).toThrow();
});

//  test case of renderReceipt

it('should return formatted receipt string when render receipt given a receipt', () => {
  let receipt = {
    receiptItems: [
      {
        name: 'Coca Cola',
        totalPrice: 6,
        quantity: 2
      },
      {
        name: 'Diet Coke',
        totalPrice: 4,
        quantity: 1
      }
    ],
    price: 10
  };

  let renderedReceipt = main.renderReceipt(receipt);

  expect(renderedReceipt).toEqual('Receipts\n'
      + '------------------------------------------------------------\n'
      + 'Coca Cola    6    2\n'
      + 'Diet Coke    4    1\n'
      + '------------------------------------------------------------\n'
      + 'Price: 10');
});

// test case of printReceipt

it('should print formatted receipt to console when print receipt given [0001, 0002, 0001]', () => {
  let barcodes = ['0001', '0002', '0001'];

  console.info = jest.fn();

  main.printReceipt(barcodes);

  expect(console.info).toHaveBeenCalledWith('Receipts\n'
      + '------------------------------------------------------------\n'
      + 'Coca Cola    6    2\n'
      + 'Diet Coke    4    1\n'
      + '------------------------------------------------------------\n'
      + 'Price: 10');
});

it('should print error message to console when print receipt given non-existing barcodes', () => {
  let barcodes = ['aaaa'];

  console.info = jest.fn();

  main.printReceipt(barcodes);

  expect(console.info).toHaveBeenCalledWith('[ERROR]: invalid barcode');
});