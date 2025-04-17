# DynamoDB Node.js API

A TypeScript-based REST API that demonstrates how to interact with Amazon DynamoDB using AWS SDK v3.

## Features

- TypeScript implementation
- AWS SDK v3 for DynamoDB
- Express.js for API routing
- Environment-based configuration
- Error handling middleware
- RESTful endpoints for CRUD operations

## Prerequisites

- Node.js (v14 or higher)
- AWS Account with DynamoDB access
- AWS CLI configured with credentials
- TypeScript

## Project Structure

```
src/
├── config/
│   └── aws.config.ts        # AWS configuration
├── models/
│   └── user.model.ts        # User data model
├── services/
│   └── dynamodb.service.ts  # DynamoDB operations
├── controllers/
│   └── user.controller.ts   # Business logic
├── routes/
│   └── user.routes.ts       # API routes
└── server.ts                # Application entry point
```

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd dynamodb-nodejs-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
PORT=3000
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

4. Create the DynamoDB table:
```bash
aws dynamodb create-table \
    --table-name Users \
    --attribute-definitions AttributeName=userId,AttributeType=S \
    --key-schema AttributeName=userId,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --region your-region
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Users

- `POST /api/users` - Create a new user
  ```json
  {
    "userId": "string",
    "name": "string",
    "email": "string"
  }
  ```

- `GET /api/users/:userId` - Get a user by ID

- `PUT /api/users/:userId` - Update a user
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```

- `DELETE /api/users/:userId` - Delete a user

- `GET /api/users` - List all users

## Error Handling

The API includes error handling middleware that returns appropriate HTTP status codes:

- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## TypeScript Configuration

The project uses TypeScript with the following key configurations:
- ES2020 target
- NodeNext module system
- Strict type checking
- Source maps for debugging

## Testing

Postman collection is available for testing the API endpoints. Import the collection from the `postman` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- AWS SDK v3 Documentation
- Express.js Documentation
- TypeScript Documentation 