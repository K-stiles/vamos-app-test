// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Vamos App API Documentation",
//       version: "1.0.0",
//       description:
//         "A CRUD API for for demonstrating how Users may book seats in our Buses",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//         description: "Local Server",
//       },
//       {
//         url: "https://frightened-bee-vestments.cyclic.app/",
//         description: "Development Server",
//       },
//     ],
//     components: {
//       schemas: {
//         User: {
//           type: "object",
//           required: ["phone"],
//           properties: {
//             id: {
//               type: "string",
//               description: "Auto-generated id of the user",
//             },
//             phone: {
//               type: "string",
//               description: "The phone number of the user",
//             },
//             username: {
//               type: "string",
//               description: "username of the user",
//             },
//             isVerifies: {
//               type: "boolean",
//               description: "The verification status of the user",
//             },
//             profile: {
//               type: "string",
//               description: "The user's profile picture url",
//             },
//           },
//           example: {
//             id: "6365043491f58b9b00a593b6",
//             phone: "233055323456",
//             username: "Jane  Doe",
//             isVerified: true,
//             profile: "https://dwbshjbds.com/bedhsvjb",
//           },
//         },
//       },
//     },
//   },
//   apis: ["../../routes/*.js"],
// };

// export default swaggerOptions;
