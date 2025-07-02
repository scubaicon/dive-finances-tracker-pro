# Deployment Instructions for Shared Hosting (Hostilica, Bluehost, etc.)

## Build Process
1. Run `npm run build` to create the production build
2. This will generate a `dist` folder with all static files

## Upload to Hosting
1. Upload all contents of the `dist` folder to your hosting provider's public_html or www folder
2. Make sure the `.htaccess` file is uploaded (it handles routing for the React app)

## Required Files Structure After Upload
```
public_html/
├── index.html
├── .htaccess
├── assets/
│   ├── *.css files
│   ├── *.js files
│   └── other assets
└── other static files
```

## Important Notes
- The `.htaccess` file ensures that React Router works properly on Apache servers
- All routes will be handled by the React app (client-side routing)
- The app uses localStorage for data persistence (no backend required)
- Make sure your hosting provider supports .htaccess files (most do)

## Testing
After upload, test these URLs to ensure routing works:
- yourdomain.com (should show login)
- yourdomain.com/dashboard (should redirect properly)
- yourdomain.com/income (should work after login)

## Troubleshooting
- If routes don't work, ensure .htaccess is uploaded and mod_rewrite is enabled
- If assets don't load, check file permissions (should be 644 for files, 755 for folders)
- Clear browser cache after deployment