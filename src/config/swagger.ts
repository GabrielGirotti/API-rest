import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "products",
        description: "API operations for products",
      },
    ],
    info: {
      title: "REST API Node.js, Express, Typescript",
      version: "1.0.0",
      description: "API Docs for products",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link{
    content: url('https://yt3.googleusercontent.com/ytc/AIdro_mb253f17yNH2eyKvVkRlDyBpiTBODvs6lDekwKrjfLMEQ');
    margin: auto;
    }
    .swagger-ui .topbar {
    background-color: black;
    }`,
  customSiteTitle: "Documentacion mi primer API Rest",
  customfavIcon: 'https://yt3.googleusercontent.com/ytc/AIdro_mb253f17yNH2eyKvVkRlDyBpiTBODvs6lDekwKrjfLMEQ',
};

export default swaggerSpec;

export { swaggerOptions };
