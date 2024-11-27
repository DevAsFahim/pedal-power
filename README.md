# Pedal Power 🚴‍♂️

Pedal Power Store is a modular Express.js application built with TypeScript and MongoDB (using Mongoose) to manage a bicycle store. The project provides a RESTful API for managing products (bicycles) and orders, with comprehensive CRUD operations and data integrity ensured by schema validation.

---

## 🚀 Features

- **Bicycle Management:**
  - Create, read, update, and delete bicycles.
  - Search bicycles by name, brand, or type.
  - Enforce validation for bicycle data (e.g., price must be positive, type must match predefined categories).

- **Order Management:**
  - Place orders and manage inventory (automatic stock adjustment).
  - Calculate revenue using MongoDB aggregation pipeline.
  - Handle insufficient stock gracefully with error handling.

- **Error Handling:**
  - Standardized error responses with meaningful messages.
  - Schema validation for data integrity.

---

## 📂 Project Structure

The project follows a **modular software architecture** for better scalability and maintainability. Each module is organized into separate folders for controllers, models, services, routers, and interfaces.

## 🛠️ Scripts

- `npm run start:prod` - Starts the production server.
- `npm run start:dev` - Starts the server in development mode using `ts-node`.
- `npm run build` - Compiles TypeScript to JavaScript in the `dist/` folder.

---

## 🧪 Testing

You can test the endpoints using tools like **Postman** or **cURL**. Ensure the server is running, and use the API endpoints described above for testing.

---

## 🎯 Future Enhancements

- Add user authentication and role-based access control.
- Implement a dashboard for managing bicycles and orders.
- Integrate advanced search filters for products.
- Add automated testing with Jest or Mocha.

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🤝 Contributions

Contributions are welcome! Feel free to fork the repository, make your changes, and submit a pull request.

---

## 📞 Contact

For any queries or support, please contact:

- **Name:** Abu Saleh Md Fahim  
- **Email:** devasfahim@gmail.com  
- **GitHub:** [DevAsFahim](https://github.com/DevAsFahim)  