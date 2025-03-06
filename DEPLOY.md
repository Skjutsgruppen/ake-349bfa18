
# Deployment Instructions

## Deploying to Netlify

This project is configured to deploy easily on Netlify.

### Automatic Deployment

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the build settings from the `netlify.toml` file
3. The site will build using `npm run build` and deploy the `dist` directory

### Manual Deployment

If you prefer to deploy manually:

1. Build the project locally:
   ```
   npm run build
   ```

2. The build output will be in the `dist` directory

3. Deploy this directory to Netlify using the Netlify CLI or drag-and-drop through the Netlify dashboard

## Troubleshooting

If you encounter build errors:

1. Make sure all dependencies are installed:
   ```
   npm install
   ```

2. Ensure you're using Node.js version 16 or higher

3. Check the build logs for specific error messages

4. For the "remix command not found" error, verify that your build command in Netlify is set to `npm run build` and not something related to Remix framework
