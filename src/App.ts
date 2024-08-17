const express = require("express");
const { swaggerUi, specs } = require('./swagger');
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// inital express
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", 1);
// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup({
//     swagger: "2.0",
//     info: {
//       description: "This is API of Billing App  ",
//       version: "1.0.0",
//       title: "Billing App",
//       contact: {
//         email: "wa.ez1995@gmail.com",
//       },
//     },
//     schemes: ["http"],
//     host: "localhost:3000",
//     basePath: "",
//     paths: {
//       "/customer/create": {
//         get: {
//           summary: "Create a new Customer",
//           description: "Create a new Customer",
//           produces: ["application/json"],
//           parameters: [],
//           responses: {
//             "201": {
//               description: "successful operation",
//               schema: {
//                 type: "array",
//                 items: {
//                   $ref: "#/definitions/sharesCalcResponse",
//                 },
//               },
//             },
//             "400": {
//               description: "Invalid status value",
//               schema: {
//                 $ref: "#/definitions/InvalidResponse",
//               },
//             },
//           },
//         },
//       },
//       "/customer/delete/:id": {
//         get: {
//           summary: "Delete a customer ",
//           description: "Delete a customer ",
//           produces: ["application/json"],
//           parameters: [],
//           responses: {
//             "200": {
//               description: "successful operation",
//               schema: {
//                 type: "array",
//                 items: {
//                   $ref: "#/definitions/amountCalcResponse",
//                 },
//               },
//             },
//             "400": {
//               description: "Invalid status value",
//               schema: {
//                 $ref: "#/definitions/InvalidResponse",
//               },
//             },
//           },
//         },
//       },
//       "/customer/get": {
//         get: {
//           summary: "get all Customers ",
//           description: "get all Customers ",
//           produces: ["application/json"],
//           responses: {
//             "200": {
//               description: "successful operation",
//               schema: {
//                 type: "array",
//                 items: {
//                   $ref: "#/definitions/priceFeedResponse",
//                 },
//               },
//             },
//             "400": {
//               description: "Invalid status value",
//               schema: {
//                 $ref: "#/definitions/InvalidResponse",
//               },
//             },
//           },
//         },
//       },
//       "/customer/getbyid/:id": {
//         get: {
//           summary: "Get Customer By Id ",
//           description: "Get Customer By Id ",
//           produces: ["application/json"],
//           parameters: [
//             {
//               in: "path",
//               name: "id",
//               schema: { type: "string" },
//               required: true,
//             },
//           ],
//           responses: {
//             "200": {
//               description: "successful operation",
//               schema: {
//                 type: "array",
//                 items: {
//                   $ref: "#/definitions/latestPriceResponse",
//                 },
//               },
//             },
//             "400": {
//               description: "Invalid status value",
//               schema: {
//                 $ref: "#/definitions/InvalidResponse",
//               },
//             },
//           },
//         },
//       },
//       "/customer/subscriptionadd": {
//         get: {
//           summary: "Assign a subscription plan to customer",
//           description:
//             "Assign a subscription plan to customer",
//           produces: ["application/json"],
//           parameters: [],
//           responses: {
//             "200": {
//               description: "successful operation",
//               schema: {
//                 type: "array",
//                 items: {
//                   $ref: "#/definitions/priceFeedResponse",
//                 },
//               },
//             },
//             "400": {
//               description: "Invalid status value",
//               schema: {
//                 $ref: "#/definitions/InvalidResponse",
//               },
//             },
//           },
//         },
//       },
//       "/customer/removeSubscriptionToCustomer/:id": {
//         get: {
//           summary: "Summery of STC share now",
//           description: "Summery of STC share now",
//           produces: ["application/json"],
//           parameters: [],
//           responses: {
//             "200": {
//               description: "successful operation",
//               schema: {
//                 type: "array",
//                 items: {
//                   $ref: "#/definitions/priceFeedResponse",
//                 },
//               },
//             },
//             "400": {
//               description: "Invalid status value",
//               schema: {
//                 $ref: "#/definitions/InvalidResponse",
//               },
//             },
//           },
//         },
//       },
//       "/subscription/create": {
//         get: {
//           summary: "get user portfolio ",
//           description: "get user portfolio ",
//           produces: ["application/json"],
//           parameters: [],
//           responses: {
//             "200": {
//               description: "successful operation",
//               schema: {
//                 type: "array",
//                 items: {
//                   $ref: "#/definitions/userPortfolioResponse",
//                 },
//               },
//             },
//             "400": {
//               description: "Invalid status value",
//               schema: {
//                 $ref: "#/definitions/InvalidResponse",
//               },
//             },
//           },
//         },
//       },

//       "/subscription/update": {
//         get: {
//           summary: "get portfolio details",
//           description: "get portfolio details",
//           produces: ["application/json"],
//           parameters: [],
//           responses: {
//             "200": {
//               description: "successful operation",
//               schema: {
//                 type: "array",
//                 items: {
//                   $ref: "#/definitions/portfolioDetailsResponse",
//                 },
//               },
//             },
//             "400": {
//               description: "Invalid status value",
//               schema: {
//                 $ref: "#/definitions/InvalidResponse",
//               },
//             },
//           },
//         },
//       },

//       "/subscription/inactive": {
//         get: {
//           summary: "checl if the user have unclaimed or not",
//           description: "checl if the user have unclaimed or not",
//           produces: ["application/json"],
//           parameters: [],
//           responses: {
//             "200": {
//               description: "successful operation",
//               schema: {
//                 type: "array",
//                 items: {
//                   $ref: "#/definitions/getUnclaimedResponse",
//                 },
//               },
//             },
//             "400": {
//               description: "Invalid status value",
//               schema: {
//                 $ref: "#/definitions/InvalidResponse",
//               },
//             },
//           },
//         },
//       },

//       "/payment/create": {
//         get: {
//           summary: "checl if the user have unclaimed or not",
//           description: "checl if the user have unclaimed or not",
//           produces: ["application/json"],
//           parameters: [],
//           responses: {
//             "200": {
//               description: "successful operation",
//               schema: {
//                 type: "array",
//                 items: {
//                   $ref: "#/definitions/getUnclaimedResponse",
//                 },
//               },
//             },
//             "400": {
//               description: "Invalid status value",
//               schema: {
//                 $ref: "#/definitions/InvalidResponse",
//               },
//             },
//           },
//         },
//       },
//     },
//     definitions: {
//       sharesCalcResponse: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//           errorCode: { type: "number" },
//           details: { type: "string" },
//           isError: { type: "boolean" },
//           data: {
//             type: "object",
//             properties: {
//               date1: {
//                 type: "object",
//                 properties: {
//                   date: { type: "string" },
//                   value: { type: "number" },
//                   sharePrice: { type: "string" },
//                   numberPfShares: { type: "string" },
//                 },
//               },
//               date2: {
//                 type: "object",
//                 properties: {
//                   date: { type: "string" },
//                   value: { type: "number" },
//                   sharePrice: { type: "string" },
//                   change: { type: "number" },
//                 },
//               },
//             },
//           },
//         },
//       },
//       amountCalcResponse: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//           errorCode: { type: "number" },
//           details: { type: "string" },
//           isError: { type: "boolean" },
//           data: {
//             type: "object",
//             properties: {
//               date1: {
//                 type: "object",
//                 properties: {
//                   date: { type: "string" },
//                   value: { type: "number" },
//                   sharePrice: { type: "string" },
//                   numberPfShares: { type: "string" },
//                 },
//               },
//               date2: {
//                 type: "object",
//                 properties: {
//                   date: { type: "string" },
//                   value: { type: "number" },
//                   sharePrice: { type: "string" },
//                   numberPfShares: { type: "string" },
//                   change: { type: "number" },
//                 },
//               },
//             },
//           },
//         },
//       },
//       latestPriceResponse: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//           errorCode: { type: "number" },
//           details: { type: "string" },
//           isError: { type: "boolean" },
//           data: {
//             type: "object",
//             properties: {
//               date: { type: "string" },
//               dateAndTime: { type: "Date" },
//               change: { type: "string" },
//               changePer: { type: "string" },
//               volume: { type: "string" },
//               high: { type: "string" },
//               low: { type: "string" },
//               last: { type: "string" },
//               open: { type: "string" },
//             },
//           },
//         },
//       },
//       priceFeedResponse: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//           errorCode: { type: "number" },
//           details: { type: "string" },
//           isError: { type: "boolean" },
//           data: {
//             type: "object",
//             properties: {
//               date: { type: "string" },
//               prevClose: { type: "string" },
//               volume: { type: "string" },
//               high: { type: "string" },
//               low: { type: "string" },
//               last: { type: "string" },
//               openPrice: { type: "string" },
//               heigh52WeekPrice: { type: "string" },
//               heigh52WeekDate: { type: "string" },
//               low52WeekPrice: { type: "string" },
//               low52WeekDate: { type: "string" },
//               closePrice: { type: "string" },
//               numberOfShares: { type: "string" },
//               currency: { type: "string" },
//             },
//           },
//         },
//       },
//       summeryResponse: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//           errorCode: { type: "string" },
//           details: { type: "string" },
//           isError: { type: "boolean" },
//           data: {
//             type: "object",
//             properties: {
//               open: { type: "string" },
//               prevClose: { type: "string" },
//               dayRange: { type: "string" },
//               weekRange52: { type: "string" },
//               volume: { type: "string" },
//               marketCap: { type: "string" },
//               earningDate: { type: "string" },
//               indusrty: { type: "string" },
//             },
//           },
//         },
//       },
//       userPortfolioResponse: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//           errorCode: { type: "string" },
//           details: { type: "string" },
//           isError: { type: "boolean" },
//           data: {
//             type: "object",
//             properties: {
//               identicationNumber: { type: "string" },
//               account: { type: "string" },
//               fullName: { type: "string" },
//             },
//           },
//         },
//       },
//       portfolioDetailsResponse: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//           errorCode: { type: "string" },
//           details: { type: "string" },
//           isError: { type: "boolean" },
//           data: {
//             type: "object",
//             properties: {
//               unreceivedDividend: { type: "string" },
//               receivedDividend: { type: "string" },
//               sharePrice: { type: "string" },
//               sharesBought: { type: "string" },
//               value: { type: "string" },
//               lastUpdate: { type: "string" },
//             },
//           },
//         },
//       },
//       getUnclaimedResponse: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//           errorCode: { type: "string" },
//           details: { type: "string" },
//           isError: { type: "boolean" },
//           data: {
//             type: "object",
//             properties: { hasDividends: "string" },
//           },
//         },
//       },
//       InvalidResponse: {
//         type: "object",
//         properties: {
//           statusCode: {
//             type: "string",
//           },
//           message: {
//             type: "string",
//           },
//         },
//       },
//     },
//   })
// );

// init logger
const logger = morgan((tokens: any, req: any, res: any) => {
  req.body.token = undefined;
  req.body.password = undefined;
  req.body.confirmPassword = undefined;

  return [
    "\nRequest:",
    "   Timestamp: " +
      new Date().toLocaleString("en-US", { timeZone: "ASIA/RIYADH" }),
    "   Method: " + tokens.method(req, res),
    "   URL: " + tokens.url(req, res),
    "   Body: " + JSON.stringify(req.body, null, "\t"),
    "Response:",
    "   Status Code: " + tokens.status(req, res),
    "   Response Time: " + tokens["response-time"](req, res) + " ms\n",
  ].join("\n");
});

app.use(logger);

// Export app express
export default app;
