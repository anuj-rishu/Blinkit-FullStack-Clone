import AdminJs from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJsMongoose from "@adminjs/mongoose";
import * as Models from "../models/index.js";
import { COOKIE_PASSWORD, sessionStore } from "./config.js";
import { authenticate } from "./config.js";

AdminJs.registerAdapter(AdminJsMongoose);

export const admin = new AdminJs({
  resources: [
    {
      resource: Models.Customer,
      options: {
        listProperties: ["phone", "role", "isactivated"],
        filterProperties: ["phone", "role"],
      },
    },
    {
      resource: Models.DeliveryPartner,
      options: {
        listProperties: ["email", "role", "isactivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Admin,
      options: {
        listProperties: ["email", "role", "isactivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Branch,
    },
    {
      resource: Models.Product,
    },
    {
      resource: Models.Category,
    },
  ],
  branding: {
    companyName: "Blinkit",
    withMadeWithLove: false,
    // favicon: "https://res.cloudinary.com/dtberehdy/image/upload/v1726223723/E%20cell%20logo.jpg",
    // logo: "https://res.cloudinary.com/dtberehdy/image/upload/v1726223723/E%20cell%20logo.jpg",
  },
  rootPath: "/admin",
});

export const buildAdminRouter = async (app) => {
  await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookiePassword: COOKIE_PASSWORD,
      cookieName: "blinkit",
    },
    app,
    {
      store: sessionStore,
      saveUninitialized: true,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
    }
  );
};
