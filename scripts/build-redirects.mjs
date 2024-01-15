import fs from "fs";
import path from "path";

import fetch from "cross-fetch";

(async () => {
    let redirects;

    try {
        redirects = await fetch('https://manager.tarkov.dev/data/redirects.json').then(response => response.json());
    }
    catch (redirectsError) {
        console.error(redirectsError);

        process.exit(1);
    }
    const __dirname = new URL(".", import.meta.url).pathname;
    let indexTemplate = fs.readFileSync(path.join(__dirname, '..', 'workers-site', 'index-template.js'), 'utf8');
    indexTemplate = indexTemplate.replace('REDIRECTS_DATA', JSON.stringify(redirects, null, 4));

    console.time('Write new data');
    fs.writeFileSync(path.join(__dirname, '..', 'workers-site', 'index.mjs'), indexTemplate);
    console.timeEnd('Write new data');
})();