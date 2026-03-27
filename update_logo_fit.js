const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/labronics_ai_website_redesigned';
const files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'careers.html', 'contact.html', 'testimonials.html'];

const LOGO_NAV_REPLACE = `            <!-- Logo -->
            <a href="index.html" class="flex items-center gap-3 group">
                <div class="size-10 md:size-12 rounded-full bg-[#f3f5f8] dark:bg-white flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform p-1">
                    <img src="static/logo.jpeg" alt="Labronics AI Solutions Logo" class="w-full h-full object-contain rounded-full" />
                </div>
                <span class="text-xl md:text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">Labronics AI Solutions</span>
            </a>`;

const LOGO_FOOTER_REPLACE = `                    <div class="flex items-center gap-3 mb-6">
                        <div class="size-10 md:size-12 rounded-full bg-[#f3f5f8] dark:bg-white flex items-center justify-center overflow-hidden shadow-sm p-1">
                            <img src="static/logo.jpeg" alt="Labronics AI Solutions Logo" class="w-full h-full object-contain rounded-full" />
                        </div>
                        <span class="text-xl font-display font-bold text-white tracking-tight">Labronics AI Solutions</span>
                    </div>`;

files.forEach(file => {
    let p = path.join(dir, file);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');

    // Fix NAV logo
    const navLogoRegex = /<!-- Logo -->\s*<a href="index.html" class="flex items-center gap-3 group">[\s\S]*?<\/a>/;
    content = content.replace(navLogoRegex, LOGO_NAV_REPLACE);

    // Fix FOOTER logo in index.html specifically
    if (file === 'index.html') {
        const footerLogoRegex = /<div class="flex items-center gap-3 mb-6">\s*<img src="static\/logo\.jpeg"[\s\S]*?<\/div>/;
        content = content.replace(footerLogoRegex, LOGO_FOOTER_REPLACE);
    }

    fs.writeFileSync(p, content);
    console.log(`Updated ${file}`);
});
