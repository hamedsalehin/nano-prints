const fs = require('fs');
let file = fs.readFileSync('src/components/SignProductPage.tsx', 'utf8');

// 1. Hide Price
file = file.replace(
  '              {/* Price */}\n              <div className="pb-5 border-b mb-5">',
  '              {/* Price */}\n              {unitPrice > 0 && (\n              <div className="pb-5 border-b mb-5">'
);
file = file.replace(
  '                </div>\n              </div>\n\n              <div className="space-y-5">',
  '                </div>\n              </div>\n              )}\n\n              <div className="space-y-5">'
);

// 2. Hide Bulk
file = file.replace(
  '                  {/* Qty tiers */}\n                  {!cfg.quantityPrices && (',
  '                  {/* Qty tiers */}\n                  {!cfg.quantityPrices && unitPrice > 0 && ('
);

// 3. Replace Bottom Actions
const startAction = '              <div className="space-y-3 mt-4">\n                {/* Upload Finished Design Button */}';
const endAction = '                  Free artwork check included with every order\n                </p>\n              </div>\n            </div>\n          </div>';

const actionsBlock = file.substring(file.indexOf(startAction), file.indexOf(endAction) + endAction.length);

const oldInner = actionsBlock.substring(
  actionsBlock.indexOf('                {/* Upload Finished Design Button */}'),
  actionsBlock.indexOf('              </div>\n            </div>\n          </div>')
);

const newActionsBlock = `              <div className="space-y-3 mt-4">
                {unitPrice > 0 ? (
                  <>
${oldInner}
                  </>
                ) : (
                  <>
                    <Link
                      href="/get-a-quote"
                      className="w-full flex items-center justify-center bg-black hover:bg-gray-900 active:scale-[0.98] text-white font-extrabold py-4 rounded-xl transition-all text-sm uppercase tracking-wider shadow-md font-poppins"
                    >
                      Request Custom Quote
                    </Link>
                    <p className="text-center text-xs text-gray-400 font-semibold pt-1">
                      Contact us for a personalized quote for your custom dimensions.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>`;

file = file.replace(actionsBlock, newActionsBlock);

// 4. Add Optional Chaining
file = file.replace('{cfg.keyFeatures.map((f)', '{cfg.keyFeatures?.map((f)');
file = file.replace('{cfg.useCases.map((t)', '{cfg.useCases?.map((t)');
file = file.replace('{cfg.specs.map((s)', '{cfg.specs?.map((s)');
file = file.replace('{cfg.reviews.map((r)', '{cfg.reviews?.map((r)');
file = file.replace('{cfg.faqs.map((f)', '{cfg.faqs?.map((f)');

// 5. Add lazy loading for RelatedProducts
if (!file.includes('const RelatedProducts = dynamic')) {
  file = file.replace(
    'import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";',
    'import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";\nimport dynamic from "next/dynamic";\n\nconst RelatedProducts = dynamic(() => import("./RelatedProducts").then(mod => mod.RelatedProducts || mod.default), { ssr: false });'
  );
}

fs.writeFileSync('src/components/SignProductPage.tsx', file);
console.log('Restored all fixes to SignProductPage.tsx');
