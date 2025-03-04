# Artelamour  
A full-stack management system for personalized product creation and sales.  

This is my first full-stack project, showcasing my ability to design and implement both frontend and backend solutions for managing personalized products efficiently.  I've since learned new approaches to clean code and application structure, but I chose to keep this implementation as is to showcase my evolution in future projects.

# Overview

In Artelamour, you can:

- Create your own user account, so your information remains accessible only to you. When you finish using the tool, you can log out, and your information will be saved in our database.

- Log in whenever you need to use the tool again.

- Save your final products, including important information such as production time and desired profit, as well as upload product images. You can edit and delete them, and you can replace the image with another or simply delete it.

- Store the materials used in your final products, including purchased quantity, unit of measure, and cost value. You can edit and delete them, but if a material is associated with a final product, first you need to desassociate or delete the final product first.

- Associate the materials and quantities used to the final product, where the application will calculate the cost of the material considering the cost value of the material and the profit percentage you want. You can edit and unlink them.

# Technologies used

This project allowed me to explore several new technologies, including some I hadn’t worked with before.

- **Backend**:  
  - **Language/Framework**: TypeScript, Node.js, Express.js  
  - **Authentication**: JSON Web Tokens (jsonwebtoken), bcryptjs  
  - **File Management**: Multer for image uploads  
  - **Server Configuration**: Docker & Docker Compose for containerization, Nginx as a reverse proxy, and Let's Encrypt for SSL/TLS certificates

- **Database**:  
  - MySQL, managed with Prisma ORM  

- **Frontend**:  
  - React.js for a responsive and interactive UI  

# Prerequisites
- **Node.js** 16.x 
- **MySQL** 8.0+
- **Git** to clone the project (use the command git clone https://github.com/devrianmendes/artelamour.git)   
- **Environment Variables**
  - Create a file '.env' in the root with the following variables:
    - DATABASE_URL: Database url conection
    - JWT_SECRET: Secret key for JWT token generation

# Local dependencies
After cloning the project, run the command **npm install** in the root directory to install all dependencies

You can check the application [here](https://artelamour.vercel.app)