import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Router } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Library API",
    version: "1.0.0",
    description: "A simple Express Library API with Swagger documentation",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The unique identifier of the user",
          },
          name: {
            type: "string",
            description: "The name of the user",
          },
          email: {
            type: "string",
            description: "The email of the user",
          },
        },
        required: ["id", "name", "email"],
      },

      UserUpdate: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the user",
          },
          email: {
            type: "string",
            description: "The email of the user",
          },
        },
        required: ["name", "email"],
      },

      UserRegistration: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name for registration",
          },
          email: {
            type: "string",
            description: "The email for registration",
          },
          password: {
            type: "string",
            description: "The password for the user",
          },
        },
        required: ["name", "email", "password"],
      },
      UserLogin: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "The email used for login",
          },
          password: {
            type: "string",
            description: "The password used for login",
          },
        },
        required: ["email", "password"],
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/bookRoutes.ts", "./src/routes/userRoutes.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app: Router) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
