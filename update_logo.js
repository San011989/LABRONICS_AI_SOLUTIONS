const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/labronics_ai_website_redesigned';
const files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'careers.html', 'contact.html', 'testimonials.html'];

files.forEach(file => {
    let p = path.join(dir, file);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');

    // 1. Fix object-cover to object-contain with padding for the Nav logo in all pages
    content = content.replace(/rounded-full object-cover shadow-lg/g, 'rounded-full object-contain p-1 shadow-lg');

    // 2. Fix the specific footer issue in index.html and any other if present
    const badFooterLogo = /<div\s+class="size-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">\s*<img src="static\/logo\.jpeg".*?class="(.*?)".*?\/>\s*<\/div>/g;
    
    // Also cover the exact case in index.html where it's formatted slightly differently due to line breaks
    const badFooterSpecific = `<div
                            class="size-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                            <img src="static/logo.jpeg" alt="Labronics AI Solutions Logo"
                                class="size-10 md:size-12 rounded-full object-contain p-1 shadow-lg group-hover:scale-105 transition-transform bg-white" />
                        </div>`;
    
    const goodFooterSpecific = `<img src="static/logo.jpeg" alt="Labronics AI Solutions Logo"
                            class="size-10 md:size-12 rounded-full object-contain p-1 shadow-lg transition-transform bg-white" />`;

    content = content.replace(badFooterSpecific, goodFooterSpecific);

    fs.writeFileSync(p, content);
    console.log(`Updated ${file}`);
});
