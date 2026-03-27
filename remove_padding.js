const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/labronics_ai_website_redesigned';
const files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'careers.html', 'contact.html', 'testimonials.html'];

files.forEach(file => {
    let p = path.join(dir, file);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');

    // Remove p-1 from nav wrapper
    content = content.replace(/transition-transform p-1"/g, 'transition-transform"');
    
    // Remove p-1 from footer wrapper (index.html specifically, but safe globally)
    content = content.replace(/shadow-sm p-1"/g, 'shadow-sm"');

    // Also just in case there's a p-[2px] or padding stuck anywhere else on the img tag
    content = content.replace(/object-contain p-1 /g, 'object-contain ');

    fs.writeFileSync(p, content);
    console.log(`Updated ${file}`);
});
