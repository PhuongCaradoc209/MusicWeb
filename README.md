🎵 Music Web

Welcome to Music Web, a full-stack music application built with Spring Boot for the backend and React for the frontend.

🚀 Features

🎧 Play and manage music

🔍 Search for songs and artists

📝 User authentication and profile management

🎶 Playlist creation and sharing

🛠️ Technologies

Backend (Spring Boot)

Java 17

Spring Boot

Spring Security (Authentication & Authorization)

JPA/Hibernate (Database ORM)

PostgreSQL/MySQL

RESTful APIs

Frontend (React)

React.js

Redux (State management)

Tailwind CSS / Material UI (Styling)

Axios (API calls)

⚡ Getting Started

🔹 Prerequisites

Install Node.js & npm/yarn

Install Java 17+

Install PostgreSQL/MySQL

🔹 Backend Setup

cd backend
./mvnw spring-boot:run

The backend runs at http://localhost:8080

🔹 Frontend Setup

cd frontend
npm install
npm start

The frontend runs at http://localhost:3000

💃👫 Database Configuration

Modify application.properties in backend/src/main/resources/

spring.datasource.url=jdbc:postgresql://localhost:5432/musicdb
spring.datasource.username=your_username
spring.datasource.password=your_password

📛 API Endpoints

Method

Endpoint

Description

GET

/api/songs

Get all songs

POST

/api/auth/signup

User registration

POST

/api/auth/login

User login

👥 Contributors

PhuongCaradoc209 - GitHub

🐟 License

This project is licensed under the MIT License.