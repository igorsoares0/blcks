# Templates Storage

This folder contains the downloadable template .zip files.

## Files

- `dashboard.zip` - Modern Dashboard template
- `landing.zip` - SaaS Landing Page template
- `versions.json` - Version metadata and changelog

## How to Update Templates

1. Generate the .zip file locally with your template project
2. Replace the existing .zip file in this folder
3. Update the version and changelog in `versions.json`
4. Commit and deploy

## Important Notes

- This folder is NOT in `/public` - files are served via protected API routes
- Users must have a valid license or template purchase to download
- Downloads are unlimited for authorized users
- Keep .zip files under 50MB for optimal performance
