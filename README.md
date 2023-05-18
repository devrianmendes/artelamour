# Artelamour

This is my first full-stack project, developed entirely by myself. Artelamour is a management system for personalized products, serving any type of product you can produce.


# Overview

In Artelamour, you can:

- Create your own user account, so your information remains accessible only to you. When you finish using the tool, you can log out, and your information will be saved in our database.

- Log in whenever you need to use the tool again.

- Save your final products, including important information such as production time and desired profit, as well as upload product images. You can edit and delete them, and the image you can exchange for another or simply delete it.

- Store the materials used in your final products, including purchased quantity, unit of measure, and cost value. You can edit and delete them, but if a material is associated with a final product, first you need to desassociate or delete the final product first.

- Associate the materials and quantities used with the final product, where the application will calculate the material cost considering the material's cost value (The calculation part is not yet 100% accurate, and I'm working on fixing it.). You can edit and desassociate them.


# Resources

In this project, I learned the usefulness of several technologies that I hadn't had the opportunity to work with before, and some that I wasn't even familiar with.

For the database, I used MySQL and utilized Prisma as the ORM.

The backend was written in TypeScript in a Node.js environment, with the help of Express.js for server creation. For user authentication, bcryptjs was used for password encryption, and jsonwebtoken for authentication. I used Multer for image storage.

The frontend was developed using React.js.