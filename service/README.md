# Counter Service API

A simple Express.js API service that provides counter functionality.

## Project Structure

```
service/
├── node_modules/           # Dependencies (created by npm)
├── src/                    # Application source code
│   ├── config/             # Configuration files 
│   │   └── index.js        # Central configuration
│   ├── controllers/        # Route controllers
│   │   └── counter.js      # Counter-specific controllers
│   ├── middleware/         # Custom middleware
│   │   ├── error.js        # Error handling middleware
│   │   └── logger.js       # Logging middleware
│   ├── models/             # Data models (if using a database)
│   ├── routes/             # API routes
│   │   ├── index.js        # Route aggregator
│   │   └── counter.js      # Counter-specific routes
│   ├── services/           # Business logic
│   │   └── counter.js      # Counter service operations
│   ├── utils/              # Utility functions
│   │   ├── constants.js    # Constants including status codes
│   │   └── logger.js       # Logging utility
│   └── app.js              # Express application setup
├── tests/                  # Test files
│   ├── unit/               # Unit tests
│   └── integration/        # Integration tests
│       └── routes/         # API route tests
├── .env.example            # Environment variables template
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore file
├── jest.config.js          # Jest configuration
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Dependency lock file
├── README.md               # Project documentation
└── server.js               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd service
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

### Running the Application

To start the server in development mode:

```
npm run dev
```

To start the server in production mode:

```
npm start
```

### API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/counter` - Get the current counter value
- `POST /api/counter/increment` - Increment the counter
- `POST /api/counter/reset` - Reset the counter to zero

## Testing

Run tests with:

```
npm test
```

## License

ISC
