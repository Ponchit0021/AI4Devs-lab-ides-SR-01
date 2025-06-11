# Frontend Configuration

## Environment Variables

Create a `.env` file in the frontend directory with the following variables (optional):

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3010/api
```

If you don't create this file, the application will use the default API URL: `http://localhost:3010/api`

## Development

To start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Production

To build the production version:
```bash
npm run build
```

This creates a `build` folder with the production-ready files that can be served by any static file server.

## Testing

To run tests:
```bash
npm test
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Modern UI**: Clean, professional interface with smooth animations
- **Form Validation**: Real-time validation with helpful error messages
- **Error Handling**: Comprehensive error handling with user-friendly messages 