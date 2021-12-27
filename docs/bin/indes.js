const fs = require('fs');
const path = require('path');

let docs = {};
let CHEATSHEET_PATH = 'docs/cheatsheet.json';
let COMPONENTS_PATH = './.dev/webcardinal/.webcardinal/components';

const components = fs.readdirSync(COMPONENTS_PATH, {
    withFileTypes: true
}).filter(item => item.isDirectory())
  .map(item => item.name);

for (const component of components) {
    const cheatsheetPath = path.join(process.cwd(), COMPONENTS_PATH, component, 'docs/custom/cheatsheet.json');

    if (!fs.existsSync(cheatsheetPath)) {
        console.warn(
            `${component} does not have custom docs!\n`
            `You must use 'generator' function from @webcardinal/internals!`
        );
        continue;
    }

    const cheatsheet = require(cheatsheetPath);
    docs = {...docs, ...cheatsheet};

    const sort = object => Object.keys(object).sort().reduce((r, k) => (r[k] = object[k], r), {});
    docs = sort(docs);
}

fs.writeFileSync(path.join(process.cwd(), CHEATSHEET_PATH), JSON.stringify(docs));
// fs.writeFileSync(path.join(process.cwd(), CHEATSHEET_PATH), JSON.stringify(docs, null, 2));
