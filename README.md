# Game Artist Portfolio Website

A clean, fast, static website built with HTML, CSS, and Vanilla JavaScript. Ready for deployment to cPanel.

## Folder Structure

```
public_html/
├── css/
│   └── style.css          # Custom styles and responsive utilities
├── js/
│   ├── components.js      # Shared navbar and footer components
│   ├── blog.js           # Blog rendering from JSON
│   ├── portfolio.js      # Portfolio rendering from JSON
│   └── script.js         # General functionality
├── blogs/
│   ├── blogs.json        # Blog entries (edit this to add/update blogs)
│   └── [blog HTML files] # Individual blog post pages (add manually)
├── portfolio/
│   ├── portfolio.json    # Portfolio entries (edit this to add/update projects)
│   └── [project HTML files] # Individual project pages (add manually)
├── assets/               # Images, videos, thumbnails, blog covers
├── index.html            # Homepage
├── about.html            # About page
├── blog.html             # Blog listing page
├── portfolio.html        # Portfolio listing page
└── contact.html          # Contact page
```

## How to Update Content

### Adding/Updating Blogs

1. Edit `blogs/blogs.json` - Add or modify blog entries with:
   - `title`: Blog post title
   - `description`: Short description
   - `date`: Date in YYYY-MM-DD format
   - `readTime`: Optional reading time (e.g., "5 min read")
   - `coverImage`: URL or path to cover image
   - `link`: Path to blog HTML file (e.g., "blogs/my-post.html")
   - `category`: Category name
   - `tags`: Array of tag strings

2. Create the blog HTML file in `blogs/` folder (e.g., `blogs/my-post.html`)

3. The blog listing page (`blog.html`) will automatically display all entries from the JSON file.

### Adding/Updating Portfolio Projects

1. Edit `portfolio/portfolio.json` - Add or modify project entries with:
   - `title`: Project title
   - `description`: Project description
   - `thumbnail`: URL or path to thumbnail image
   - `videoEmbed`: Optional YouTube/Vimeo embed URL
   - `link`: Path to project HTML file (e.g., "portfolio/my-project.html")
   - `category`: Project category
   - `tags`: Array of tag strings
   - `featured`: Boolean (true for featured projects)

2. Create the project HTML file in `portfolio/` folder (e.g., `portfolio/my-project.html`)

3. The portfolio page (`portfolio.html`) will automatically display all entries from the JSON file.

### Updating Navbar/Footer

Edit `js/components.js` - The `createNavbar()` and `createFooter()` functions contain the shared navigation and footer. Changes here will apply to all pages.

## Deployment

1. Upload the entire `public_html` folder contents to your cPanel `public_html` directory
2. Ensure all file paths are correct (relative paths are used)
3. Test all pages and links
4. The website is ready to go live!

## Features

- ✅ Shared navbar and footer (easy to update)
- ✅ Responsive design (mobile-first)
- ✅ Blog system with JSON-based content
- ✅ Portfolio system with JSON-based content
- ✅ Lightweight animations
- ✅ No build step required
- ✅ No frameworks or dependencies (except Tailwind CDN for styling)

## Notes

- The website uses Tailwind CSS via CDN for styling
- All images should be optimized before uploading
- Blog and portfolio HTML files should follow the same structure as the main pages
- Contact form currently submits to `#` - update the form action to your backend endpoint if needed

