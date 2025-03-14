# Coupon Backend

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Docker

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed or use a MongoDB cloud service
- Docker (optional, for containerization)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/coupon-backend.git
    cd coupon-backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

### Using Docker (Optional)

1. **Build the Docker image:**
    ```bash
    docker build -t coupon-backend .
    ```

2. **Run the Docker container:**
    ```bash
    docker run -p 3000:3000 --env-file .env coupon-backend
    ```

### API Documentation
For detailed API documentation, refer to the [API Docs](./docs/api.md).

### Contributing
Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) first.

### License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.