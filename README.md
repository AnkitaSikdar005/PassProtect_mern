# PassProtect 🔒

PassProtect is a secure password manager built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).  
It allows users to **save**, **edit**, and **delete** passwords securely, storing them in a MongoDB database.  

The backend is deployed on **Render** and the frontend is live on **Vercel**.  
All APIs were tested using **Postman**.

---

## 🌟 Features
- ➕ Save passwords
- 📝 Edit existing passwords
- ❌ Delete passwords
- 🛠️ API tested using **Postman**
- ☁️ Backend deployed on **Render**
- 🌐 Frontend deployed on **Vercel**

---

## 🚀 Live Demo

- **Frontend**: [Visit Frontend](https://pass-protect-mern.vercel.app/)  
- **Backend API**: [Visit Backend](https://passprotect-mern.onrender.com)



---

## 🛠️ Tech Stack

- **MongoDB** - Database
- **Express.js** - Backend framework
- **React.js** - Frontend framework
- **Node.js** - Server environment
- **Postman** - API testing tool

---

## 📂 Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/passprotect.git
cd passprotect
```
### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a .env file inside backend and add your MongoDB connection string
```bash
 MONGO_URI=your_mongodb_connection_string
```
- Start the backend server:
 ```bash
 npm start
 ```
### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

- Make sure to update the API base URL in your frontend to point to the deployed backend (or local backend for development).

### 4.📬 Postman API Testing
 - All API endpoints were tested using Postman.

   ##  API Endpoints

| Method | Endpoint            | Description               |
|--------|---------------------|----------------------------|
| POST   | /api/passwords       | Save a new password        |
| GET    | /api/passwords       | Get all saved passwords    |
| PUT    | /api/passwords/:id   | Update an existing password|
| DELETE | /api/passwords/:id   | Delete a password          |


