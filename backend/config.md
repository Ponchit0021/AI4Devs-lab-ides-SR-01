# Backend Configuration

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/talent_tracking_system"

# Server Configuration
PORT=3010
NODE_ENV=development

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000
```

## Database Setup

1. Install PostgreSQL on your system
2. Create a new database:
   ```bash
   createdb talent_tracking_system
   ```
3. Update the `DATABASE_URL` in your `.env` file with your actual database credentials
4. Run Prisma migrations:
   ```bash
   npx prisma db push
   ```

## Development

To start the development server:
```bash
npm run dev
```

The server will be available at `http://localhost:3010`

## Production

To build and start the production server:
```bash
npm run build
npm start
``` 