# Deployment Instructions for Apache Servers (XAMPP, Hostilica, Bluehost, etc.)

## Build Process
1. Run `npm run build` to create the production build
2. This will generate a `dist` folder with all static files

## For XAMPP (Local Development)
1. Copy all contents of the `dist` folder to your XAMPP `htdocs` folder
2. Create a new folder like `htdocs/your-app-name/` and place the files there
3. Make sure the `.htaccess` file is included (it handles routing for the React app)
4. Start Apache in XAMPP Control Panel
5. Access your app at `http://localhost/your-app-name/`

## For Shared Hosting (Hostilica, Bluehost, etc.)
1. Upload all contents of the `dist` folder to your hosting provider's public_html or www folder
2. Make sure the `.htaccess` file is uploaded (it handles routing for the React app)

## Required Files Structure After Upload

### XAMPP Structure
```
htdocs/your-app-name/
├── index.html
├── .htaccess
├── assets/
│   ├── *.css files
│   ├── *.js files
│   └── other assets
└── other static files
```

### Shared Hosting Structure
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

### XAMPP Testing
After copying files to htdocs, test these URLs:
- http://localhost/your-app-name/ (should show login)
- http://localhost/your-app-name/dashboard (should redirect properly)
- http://localhost/your-app-name/income (should work after login)

### Shared Hosting Testing
After upload, test these URLs to ensure routing works:
- yourdomain.com (should show login)
- yourdomain.com/dashboard (should redirect properly)
- yourdomain.com/income (should work after login)

## Troubleshooting
- If routes don't work, ensure .htaccess is uploaded and mod_rewrite is enabled
- If assets don't load, check file permissions (should be 644 for files, 755 for folders)
- Clear browser cache after deployment