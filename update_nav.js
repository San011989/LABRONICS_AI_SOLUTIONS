const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/labronics_ai_website_redesigned';
const files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'careers.html', 'contact.html', 'testimonials.html'];

const LOGO_NEW = `            <!-- Logo -->
            <a href="index.html" class="flex items-center gap-3 group">
                <img src="static/logo.jpeg" alt="Labronics AI Solutions Logo" class="size-10 md:size-12 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform bg-white" />
                <span class="text-xl md:text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">Labronics AI Solutions</span>
            </a>`;

files.forEach(file => {
    let p = path.join(dir, file);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');

    // FIX LOGO in testimonials.html
    if (file === 'testimonials.html') {
        const logoRegex = /<!-- Logo -->\s*<a href="index.html" class="flex items-center gap-3 group">[\s\S]*?<\/a>/;
        content = content.replace(logoRegex, LOGO_NEW);
        
        // Fix navigation entirely for testimonials.html
        const navRegex = /<!-- Desktop Menu -->\s*<div class="hidden md:flex items-center gap-8">([\s\S]*?)<\/div>/;
        const navBlock = `<!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-8">
                <a href="index.html"
                    class="text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-primary transition-colors">Home</a>
                <a href="about.html"
                    class="text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-primary transition-colors">About</a>
                <a href="services.html"
                    class="text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-primary transition-colors">Services</a>
                <a href="portfolio.html"
                    class="text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-primary transition-colors">Portfolio</a>
                <a href="careers.html"
                    class="text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-primary transition-colors">Careers</a>
                <a href="testimonials.html"
                    class="text-sm font-medium text-slate-900 dark:text-white hover:text-primary transition-colors">Testimonials</a>
            </div>`;
        content = content.replace(navRegex, navBlock);
        
    } else {
        // Just append testimonials.html to the others if missing
        if (!content.includes('testimonials.html"')) {
            const replaceCareers = /<a href="careers.html"[\s\S]*?<\/a>/;
            const testLink = `\n                <a href="testimonials.html"\n                    class="text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-primary transition-colors">Testimonials</a>`;
            content = content.replace(replaceCareers, match => {
                return match + testLink;
            });
        }
    }

    fs.writeFileSync(p, content);
    console.log(`Updated ${file}`);
});
