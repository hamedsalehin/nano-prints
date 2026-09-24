import { PRODUCTS_REGISTRY } from '../src/lib/productsRegistry';

const category = PRODUCTS_REGISTRY['programmable-led-signs'];
const product = category.products[0];
const config = product.config;

// Simulate selecting options
const selects = config.selects || [];
const selectedSize = config.sizes[0];

const selectValues = {
  Width: selects.find(s => s.label === 'Width')!.options[0],
  Height: selects.find(s => s.label === 'Height')!.options[0],
  Model: selects.find(s => s.label === 'Model')!.options[0],
  Waterproof: selects.find(s => s.label === 'Waterproof')!.options[1]
};

let price = selectedSize.basePrice;
let multiplier = 1;

Object.values(selectValues).forEach((v) => {
  const adder = (v as any).sizePriceAdders?.[selectedSize.value] ?? v.priceAdder;
  console.log('Value:', v.label, 'Adder:', adder, 'Mult:', v.priceMultiplier);
  // IF ADDER IS UNDEFINED, IT BECOMES NAN!
  if (adder === undefined) console.log("ADDER IS UNDEFINED FOR", v.label);
  price += (adder || 0);
  if (v.priceMultiplier !== undefined) {
    multiplier *= v.priceMultiplier;
  }
});

console.log('Base price:', selectedSize.basePrice);
console.log('Final price:', price, 'Final multiplier:', multiplier);
console.log('Total Price:', price * multiplier);
