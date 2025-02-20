# 🎵 Music Web  

Welcome to **Music Web**, a full-stack music application built with **Spring Boot** for the backend and **React** for the frontend.  

## 🚀 Features  

- 🎧 Play and manage music  
- 🔍 Search for songs and artists  
- 📝 User authentication and profile management  
- 🎶 Playlist creation and sharing  

## 🛠️ Technologies  

### Backend (Spring Boot)  
- Java 23  
- Spring Boot  
- Spring Security (Authentication & Authorization)  
- JPA/Hibernate (Database ORM)  
- MySQL  
- RESTful APIs  
- Redis Cache (Using Docker)

### Frontend (React)  
- React.js  
- Redux (State management)  
- Tailwind CSS / Material UI (Styling)  
- Axios (API calls)  

## ⚡ Getting Started  

### 🔹 Prerequisites  
- Install **Node.js** & **npm/yarn**  
- Install **Java 23+**  
- Install **MySQL**  
- Install **Docker** (to run Redis)

### 🔹 Backend Setup  

1. Clone the repository and navigate to the backend folder:  
   ```sh
   cd backend
   ```
2. Start Redis in Docker (if not already running):  
   ```sh
   docker run --name redis -d -p 6379:6379 redis
   ```
3. Run the Spring Boot application:  
   ```sh
   ./mvnw spring-boot:run
   ```

### 🔹 Frontend Setup  

1. Navigate to the frontend folder:  
   ```sh
   cd frontend
   ```
2. Install dependencies and start the development server:  
   ```sh
   npm install
   npm run dev
   ```

## 📖 API Documentation  
- Access API documentation at: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## 🤝 Contributing  
Contributions are welcome! Please refer to `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## 📄 License  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.