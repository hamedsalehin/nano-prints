const fs = require('fs');

let page = fs.readFileSync('src/components/SignProductPage.tsx', 'utf8');

// 1. Hide the price block when unitPrice === 0
page = page.replace(
  '<div className="pb-5 border-b mb-5">',
  '{unitPrice > 0 && (<div className="pb-5 border-b mb-5">'
);
// find the end of the price block (it ends right before `<div className="space-y-5">`)
page = page.replace(
  '              <div className="space-y-5">',
  '              </div>)}\n\n              <div className="space-y-5">'
);

// 2. Hide quantity and total price block when unitPrice === 0
// Wait, the quantity block starts with: `{/* Quantity */}`
page = page.replace(
  '                {/* Quantity */}',
  '                {/* Quantity */}\n                {unitPrice > 0 && ('
);
// The quantity block ends before `{/* Shipping Date Countdown Widget */}`
page = page.replace(
  '              {/* Shipping Date Countdown Widget */}',
  '                )}\n              {/* Shipping Date Countdown Widget */}'
);

// 3. Replace the action buttons at the bottom
// The action buttons start at `<div className="space-y-3 mt-4">`
// Let's replace the whole block until `</div>\n            </div>\n          </div>`

const bottomBlockStartStr = '              <div className="space-y-3 mt-4">';
const bottomBlockStart = page.indexOf(bottomBlockStartStr);
const bottomBlockEnd = page.indexOf('            </div>\n          </div>', bottomBlockStart);

if (bottomBlockStart !== -1 && bottomBlockEnd !== -1) {
  let oldActions = page.substring(bottomBlockStart, bottomBlockEnd);
  // We wrap oldActions in {unitPrice > 0 ? ( oldActions ) : ( newQuoteAction )}
  // Wait, oldActions already has the div space-y-3 mt-4, which we can keep inside the condition.
  
  let newActions = `{unitPrice > 0 ? (\n${oldActions}\n) : (
              <div className="space-y-3 mt-4">
                <a
                  href="/contact"
                  className="w-full flex items-center justify-center bg-black hover:bg-gray-900 active:scale-[0.98] text-white font-extrabold py-4 rounded-xl transition-all text-sm uppercase tracking-wider shadow-md font-poppins"
                >
                  Request Custom Quote
                </a>
                <p className="text-center text-xs text-gray-400 font-semibold pt-1">
                  Contact us to get a personalized quote for your exact dimensions.
                </p>
              </div>\n)}\n`;
              
  page = page.substring(0, bottomBlockStart) + newActions + page.substring(bottomBlockEnd);
}

fs.writeFileSync('src/components/SignProductPage.tsx', page);
console.log('Product page updated successfully to handle zero price logic');
