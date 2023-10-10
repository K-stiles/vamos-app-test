import swaggerJSDoc from "swagger-jsdoc";
import { User, Trip, Ticket, Agency, Bus, Admin, SubAdmin, Payment } from "./schemas";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",

        /** DOCS INFO DATA */
        info: {
            title: "Vamos App API Documentation",
            version: "1.0.0",
            description: "A CRUD API for demonstrating how Users may book seats in our Buses"
        },

        /** SERVERS  */
        servers: [
            {
                url: "http://localhost:1337",
                description: "Local Server"
            },
            {
                url: "https://nervous-cow-stockings.cyclic.app/",
                description: "Development Server"
            }
        ],

        /** TAGS  */
        tags: [
            {
                name: "Authentication",
                description: "Client authentication routes"
            },
            {
                name: "Users",
                description: "Routes for managing user - related data, authentication, and user profiles."
            },
            {
                name: "Trips",
                description: "Routes for creating, updating, and retrieving information about user trips."
            },
            {
                name: "Ticket",
                description: "Routes for purchasing, managing, and retrieving tickets for trips."
            },
            {
                name: "Agency",
                description: "Routes related to transportation agencies and their information."
            },
            {
                name: "Bus",
                description: "Managing bus - related data and operations."
            },
            {
                name: "Admin",
                description: "Admin routes"
            },
            {
                name: "SubAdmin",
                description: "Managing subordinate user accounts and permissions."
            },
            {
                name: "Payment",
                description: "Payment routes"
            }
        ],

        /** COMPONENTS  */
        components: {
            securitySchemes: {
                Token: {
                    type: "token",
                    in: "header",
                    name: "authorization"
                }
            },

            /** SCHEMAS  */
            schemas: {
                User,
                Trip,
                Ticket,
                Agency,
                Bus,
                Admin,
                SubAdmin,
                Payment
            }
        },

        /** ROUTE PATHS */
        paths: {
            "/api/v1/auth/register": {
                post: {
                    tags: ["Authentication"],
                    summary: "User information sent to the server for registration",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string",
                                            example: "trailmail"
                                        },
                                        phone: {
                                            type: "string",
                                            example: "02445554445"
                                        },
                                        password: {
                                            type: "string",
                                            example: "password1234"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            headers: {
                                "Set-cookie": {
                                    schema: {
                                        type: "object"
                                    },
                                    description: "contains verifiedEmail verifiedMember id role email in object of name data"
                                }
                            },
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            okay: true,
                                            status: 201,
                                            data: {
                                                verifiedEmail: false,
                                                verifiedMember: false,
                                                role: "member",
                                                id: "9a0b342a-91d3-4bf8-b200-95fff6c416fc",
                                                email: "me@gmail.com"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "409": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Email Already Exists"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/auth/otpverification": {
                post: {
                    tags: ["Authentication"],
                    summary: "Verifies user credentials and OTP",
                    parameters: [
                        {
                            in: "query",
                            name: "username",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "trailmail"
                        },
                        {
                            in: "query",
                            name: "phone",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "02445554445"
                        },
                        {
                            in: "query",
                            name: "password",
                            required: true,
                            schema: {
                                type: "string",
                                format: "password"
                            },
                            example: "password1234"
                        },
                        {
                            in: "query",
                            name: "otp",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "123456"
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            okay: true,
                                            status: 200,
                                            data: {
                                                token: "your_generated_token_here",
                                                user: {
                                                    id: "9a0b342a-91d3-4bf8-b200-95fff6c416fc",
                                                    email: "me@gmail.com",
                                                    role: "member"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Invalid credentials"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/auth/login": {
                post: {
                    tags: ["Authentication"],
                    summary: "Log in a user",
                    description: "Route to login user or admin",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: {
                                            type: "string",
                                            description: "User Email",
                                            example: "trail.mail@gmail.com"
                                        },
                                        password: {
                                            type: "string",
                                            description: "User password",
                                            example: "password1234"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "409": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "User does not exist"
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Invalid Credentials"
                                        }
                                    }
                                }
                            }
                        },
                        "200": {
                            headers: {
                                "Set-cookie": {
                                    schema: {
                                        type: "object"
                                    }
                                }
                            },
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            data: {
                                                verifiedEmail: false,
                                                verifiedMember: false,
                                                role: "member",
                                                id: "9a0b342a-91d3-4bf8-b200-95fff6c416fc",
                                                email: "me@gmail.com"
                                            },
                                            access_token: "your_access_token_here"
                                        }
                                    }
                                }
                            }
                        },
                        "412": {
                            $ref: "#/components/responses/Unauthorized"
                        }
                    }
                }
            },
            "/api/v1/auth/logout": {
                get: {
                    tags: ["Authentication"],
                    summary: "Log out a user",
                    description: "Route to logout user or admin",
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Logout successful"
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/users": {
                get: {
                    summary: "Returns the list of all the users",
                    tags: ["Users"],
                    responses: {
                        "200": {
                            description: "The list of all the users",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/User"
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "No user was found"
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                }
            },
            "/api/v1/users/{id}": {
                get: {
                    summary: "Get a user by id",
                    tags: ["Users"],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The user id"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "The user details by id",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/User"
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "User does not exist"
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                },
                put: {
                    summary: "Update a User",
                    tags: ["Users"],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The user id"
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    example: {
                                        username: "Abednego",
                                        phone: "0247157301"
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Successfully updated the user",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/User"
                                    }
                                }
                            }
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                },
                delete: {
                    summary: "Delete a User",
                    tags: ["Users"],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The user id"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "User account has been successfully deleted",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/User"
                                    }
                                }
                            }
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                }
            },
            "/api/v1/trips": {
                post: {
                    summary: "Create a new trip",
                    tags: ["Trips"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    example: {
                                        destinationRegion: "Greater Accra",
                                        arrivalRegion: "Northern",
                                        destination: "Accra",
                                        arrival: "Tamale",
                                        departureDate: "8 Nov. 2022",
                                        arrivalDate: "8 Nov. 2022",
                                        departureTime: "7:00 am",
                                        arrivalTime: "8:00 pm",
                                        duration: "10 hr 41 min",
                                        distance: "613.2 km"
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "The trip was successfully created",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Trip"
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Error occurred"
                        }
                    }
                },
                get: {
                    summary: "Returns the list of all the trips",
                    tags: ["Trips"],
                    responses: {
                        "200": {
                            description: "The list of all the trips",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/Trip"
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "No Trip was found"
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                }
            },
            "/api/v1/trips/{id}": {
                get: {
                    summary: "Get a trip by id",
                    tags: ["Trips"],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The trip id"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "The trip details by id",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Trip"
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Trip does not exist"
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                },
                put: {
                    summary: "Update a trip",
                    tags: ["Trips"],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The trip id"
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    example: {
                                        destinationRegion: "Greater Accra",
                                        arrivalRegion: "Northern",
                                        destination: "Accra",
                                        arrival: "Tamale",
                                        departureDate: "8 Nov. 2022",
                                        arrivalDate: "8 Nov. 2022",
                                        departureTime: "7:00 am",
                                        arrivalTime: "8:00 pm",
                                        duration: "10 hr 41 min",
                                        distance: "613.2 km"
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Successfully updated the trip",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Trip"
                                    }
                                }
                            }
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                },
                delete: {
                    summary: "Delete a trip",
                    tags: ["Trips"],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The trip id"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Trip successfully deleted"
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                }
            },
            "/api/v1/admin/register": {
                post: {
                    tags: ["Authentication"],
                    summary: "Create an admin account",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["username", "email", "phone", "password"],
                                    properties: {
                                        username: { type: "string", example: "admin123" },
                                        email: { type: "string", example: "admin@example.com" },
                                        phone: { type: "string", example: "123-456-7890" },
                                        password: { type: "string", example: "password1234" },
                                        id: { type: "string", example: "1" },
                                        profile: { type: "string", example: "https://example.com/admin-profile.jpg" },
                                        roles: { type: "integer", example: 1 }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Admin account created successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Invalid input"
                                        }
                                    }
                                }
                            }
                        },
                        "409": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Admin account already exists"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/admin/login": {
                post: {
                    tags: ["Authentication"],
                    summary: "Login as an admin",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["email", "password"],
                                    properties: {
                                        email: { type: "string", example: "admin@example.com" },
                                        password: { type: "string", example: "password1234" }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            headers: {
                                "Set-cookie": {
                                    schema: {
                                        type: "object"
                                    },
                                    description: "contains verifiedEmail verifiedMember id role email in object of name data"
                                }
                            },
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            data: {
                                                verifiedEmail: false,
                                                verifiedMember: false,
                                                role: "admin",
                                                id: "9a0b342a-91d3-4bf8-b200-95fff6c416fc",
                                                email: "admin@example.com"
                                            },
                                            access_token: ""
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/admin/": {
                get: {
                    tags: ["Admin"],
                    summary: "Get all admin accounts",
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id: { type: "string", example: "1" },
                                                username: { type: "string", example: "admin123" },
                                                email: { type: "string", example: "admin@example.com" },
                                                phone: { type: "string", example: "123-456-7890" },
                                                profile: { type: "string", example: "https://example.com/admin-profile.jpg" },
                                                roles: { type: "integer", example: 1 }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/admin/{id}": {
                get: {
                    tags: ["Admin"],
                    summary: "Get an admin account by ID",
                    parameters: [
                        {
                            in: "query",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "1"
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string", example: "1" },
                                            username: { type: "string", example: "admin123" },
                                            email: { type: "string", example: "admin@example.com" },
                                            phone: { type: "string", example: "123-456-7890" },
                                            profile: { type: "string", example: "https://example.com/admin-profile.jpg" },
                                            roles: { type: "integer", example: 1 }
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Admin not found"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    tags: ["Admin"],
                    summary: "Update an admin account by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "1"
                        },
                        {
                            in: "query",
                            name: "username",
                            schema: {
                                type: "string"
                            },
                            example: "new_admin123"
                        },
                        {
                            in: "query",
                            name: "email",
                            schema: {
                                type: "string"
                            },
                            example: "new_admin@example.com"
                        },
                        {
                            in: "query",
                            name: "phone",
                            schema: {
                                type: "string"
                            },
                            example: "987-654-3210"
                        },
                        {
                            in: "query",
                            name: "profile",
                            schema: {
                                type: "string"
                            },
                            example: "https://example.com/new-admin-profile.jpg"
                        },
                        {
                            in: "query",
                            name: "roles",
                            schema: {
                                type: "integer"
                            },
                            example: 2
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Admin account updated successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Admin not found"
                                        }
                                    }
                                }
                            }
                        },
                        "409": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Username or email already in use"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    summary: "Delete an admin account by ID",
                    tags: ["Admin"],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "1"
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Admin account deleted successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Admin not found"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/admin/register-sub": {
                post: {
                    tags: ["Authentication"],
                    summary: "Create a subAdmin account",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["username", "email", "phone", "password"],
                                    properties: {
                                        username: {
                                            type: "string",
                                            example: "SubAdmin123"
                                        },
                                        email: {
                                            type: "string",
                                            example: "SubAdmin@example.com"
                                        },
                                        phone: {
                                            type: "string",
                                            example: "123-456-7890"
                                        },
                                        password: {
                                            type: "string",
                                            example: "password1234"
                                        },
                                        id: {
                                            type: "string",
                                            example: "1"
                                        },
                                        profile: {
                                            type: "string",
                                            example: "https://example.com/SubAdmin-profile.jpg"
                                        },
                                        roles: {
                                            type: "integer",
                                            example: 1
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "SubAdmin account created successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Invalid input"
                                        }
                                    }
                                }
                            }
                        },
                        "409": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "SubAdmin account already exists"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/admin/logout": {
                post: {
                    tags: ["Authentication"],
                    summary: "Logout as a admin",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["email", "password"],
                                    properties: {
                                        email: {
                                            type: "string",
                                            example: "admin@example.com"
                                        },
                                        password: {
                                            type: "string",
                                            example: "password1234"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            headers: {
                                "Set-cookie": {
                                    schema: {
                                        type: "object"
                                    }
                                }
                            },
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            data: {
                                                verifiedEmail: false,
                                                verifiedMember: false,
                                                role: "admin",
                                                id: "9a0b342a-91d3-4bf8-b200-95fff6c416fc",
                                                email: "admin@example.com"
                                            },
                                            access_token: ""
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/admin-sub/": {
                get: {
                    tags: ["SubAdmin"],
                    summary: "Get all SubAdmin accounts",
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "string",
                                                    example: "1"
                                                },
                                                username: {
                                                    type: "string",
                                                    example: "SubAdmin123"
                                                },
                                                email: {
                                                    type: "string",
                                                    example: "SubAdmin@example.com"
                                                },
                                                phone: {
                                                    type: "string",
                                                    example: "123-456-7890"
                                                },
                                                profile: {
                                                    type: "string",
                                                    example: "https://example.com/SubAdmin-profile.jpg"
                                                },
                                                roles: {
                                                    type: "integer",
                                                    example: 1
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/admin-sub/{id}": {
                get: {
                    tags: ["SubAdmin"],
                    summary: "Get a SubAdmin account by ID",
                    parameters: [
                        {
                            in: "query",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "1"
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                example: "1"
                                            },
                                            username: {
                                                type: "string",
                                                example: "SubAdmin123"
                                            },
                                            email: {
                                                type: "string",
                                                example: "SubAdmin@example.com"
                                            },
                                            phone: {
                                                type: "string",
                                                example: "123-456-7890"
                                            },
                                            profile: {
                                                type: "string",
                                                example: "https://example.com/SubAdmin-profile.jpg"
                                            },
                                            roles: {
                                                type: "integer",
                                                example: 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "SubAdmin not found"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    tags: ["SubAdmin"],
                    summary: "Update a SubAdmin account by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "1"
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string"
                                        },
                                        email: {
                                            type: "string"
                                        },
                                        phone: {
                                            type: "string"
                                        },
                                        profile: {
                                            type: "string"
                                        },
                                        roles: {
                                            type: "integer"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "SubAdmin account updated successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "SubAdmin not found"
                                        }
                                    }
                                }
                            }
                        },
                        "409": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Username or email already in use"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    tags: ["SubAdmin"],
                    summary: "Delete a SubAdmin account by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "1"
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "SubAdmin account deleted successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "SubAdmin not found"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/tickets/many": {
                post: {
                    summary: "Add many tickets for a trip",
                    tags: ["Ticket"],
                    description: "Add a ticket",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string", example: "6365043491f58b9b00a673b6" },
                                            username: { type: "string", example: "Jane Doe" },
                                            price: { type: "number", example: 100.0 },
                                            departureDateTime: { type: "string", example: "15 August 2023, 1:20 pm" },
                                            arrivalDateTime: { type: "string", example: "18 August 2023, 10:20 am" },
                                            contact: {
                                                type: "array",
                                                items: { type: "string" },
                                                example: ["Jane Doe", "jdoe@example.com", "0244408990"]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Ticket created successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Invalid input data"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/tickets/": {
                get: {
                    summary: "Returns the list of multiple tickets of trips",
                    tags: ["Ticket"],
                    description: "Get information for multiple tickets",
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id: { type: "string", example: "6365043491f58b9b00a673b6" },
                                                username: { type: "string", example: "Jane Doe" },
                                                price: { type: "number", example: 100.0 },
                                                departureDateTime: { type: "string", example: "15 August 2023, 1:20 pm" },
                                                arrivalDateTime: { type: "string", example: "18 August 2023, 10:20 am" },
                                                contact: {
                                                    type: "array",
                                                    items: { type: "string" },
                                                    example: ["Jane Doe", "jdoe@example.com", "0244408990"]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "No tickets found"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    summary: "Add a ticket for a trip",
                    tags: ["Ticket"],
                    description: "Add a ticket",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string", example: "6365043491f58b9b00a673b6" },
                                        username: { type: "string", example: "Jane Doe" },
                                        price: { type: "number", example: 100.0 },
                                        departureDateTime: { type: "string", example: "15 August 2023, 1:20 pm" },
                                        arrivalDateTime: { type: "string", example: "18 August 2023, 10:20 am" },
                                        contact: {
                                            type: "array",
                                            items: { type: "string" },
                                            example: ["Jane Doe", "jdoe@example.com", "0244408990"]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Ticket created successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Invalid input data"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/tickets/{ticketId}": {
                get: {
                    summary: "Returns a single ticket of a trip",
                    tags: ["Ticket"],
                    description: "Get information for a single ticket",
                    parameters: [
                        {
                            in: "path",
                            name: "ticketId",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "6365043491f58b9b00a673b6"
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string", example: "6365043491f58b9b00a673b6" },
                                            username: { type: "string", example: "Jane Doe" },
                                            price: { type: "number", example: 100.0 },
                                            departureDateTime: { type: "string", example: "15 August 2023, 1:20 pm" },
                                            arrivalDateTime: { type: "string", example: "18 August 2023, 10:20 am" },
                                            contact: {
                                                type: "array",
                                                items: { type: "string" },
                                                example: ["Jane Doe", "jdoe@example.com", "0244408990"]
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Ticket not found"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    summary: "Update a ticket",
                    tags: ["Ticket"],
                    description: "Update information for a ticket",
                    parameters: [
                        {
                            in: "path",
                            name: "ticketId",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "6365043491f58b9b00a673b6"
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["username", "id"],
                                    properties: {
                                        id: { type: "string", example: "6365043491f58b9b00a673b6" },
                                        username: { type: "string", example: "Updated Name" },
                                        price: { type: "number", example: 120.0 },
                                        departureDateTime: { type: "string", example: "15 August 2023, 3:00 pm" },
                                        arrivalDateTime: { type: "string", example: "18 August 2023, 12:00 pm" },
                                        contact: {
                                            type: "array",
                                            items: { type: "string" },
                                            example: ["Updated Name", "updated@example.com", "0244466888"]
                                        }
                                    }
                                }
                            }
                        },
                        responses: {
                            "200": {
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            example: {
                                                message: "Ticket updated successfully"
                                            }
                                        }
                                    }
                                }
                            },
                            "404": {
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            example: {
                                                err: "Ticket not found"
                                            }
                                        }
                                    }
                                }
                            },
                            "400": {
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            example: {
                                                err: "Invalid input data"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    summary: "Delete a ticket",
                    tags: ["Ticket"],
                    description: "Delete a ticket by ticket ID",
                    parameters: [
                        {
                            in: "path",
                            name: "ticketId",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "6365043491f58b9b00a673b6"
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Ticket deleted successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Ticket not found"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/agency": {
                get: {
                    summary: "Returns the list of all the agencies",
                    tags: ["Agency"],
                    responses: {
                        "200": {
                            description: "The list of all the agencies",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/agency"
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "No agency was found"
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                },
                post: {
                    summary: "Add an agency",
                    tags: ["Agency"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    example: {
                                        agencyname: "Abednego",
                                        phone: "0247157301"
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "Agency created successfully"
                        },
                        "400": {
                            description: "Invalid input data"
                        }
                    }
                }
            },
            "/api/v1/agency/{agencyId}": {
                get: {
                    summary: "Get an agency by id",
                    tags: ["Agency"],
                    parameters: [
                        {
                            in: "path",
                            name: "agencyId",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The agency id"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "The agency details by id",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/agency"
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Agency does not exist"
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                },
                put: {
                    summary: "Update an agency",
                    tags: ["Agency"],
                    parameters: [
                        {
                            in: "path",
                            name: "agencyId",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The agency id"
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    example: {
                                        agencyname: "Updated Agency",
                                        phone: "0247157301"
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Successfully updated the agency",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/agency"
                                    }
                                }
                            }
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                },
                delete: {
                    summary: "Delete an agency",
                    tags: ["Agency"],
                    parameters: [
                        {
                            in: "path",
                            name: "agencyId",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The agency id"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Agency account has been successfully deleted",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/agency"
                                    }
                                }
                            }
                        },
                        "404": {
                            description: "Error occurred"
                        }
                    }
                }
            },
            "/api/v1/payments": {
                get: {
                    summary: "Get a list of all payments",
                    tags: ["Payment"],
                    responses: {
                        "200": {
                            description: "The list of all payments",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/payment"
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Error occurred"
                        },
                        "404": {
                            description: "No payments found"
                        }
                    }
                },
                post: {
                    summary: "Add a new payment",
                    tags: ["Payment"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/payment"
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "Payment created successfully"
                        },
                        "400": {
                            description: "Invalid input data"
                        }
                    }
                }
            },
            "/api/v1/payments/{paymentId}": {
                get: {
                    summary: "Get a payment by ID",
                    tags: ["Payment"],
                    parameters: [
                        {
                            in: "path",
                            name: "paymentId",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The payment ID"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Payment details by ID",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/payment"
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Error occurred"
                        },
                        "404": {
                            description: "Payment not found"
                        }
                    }
                },
                put: {
                    summary: "Update a payment",
                    tags: ["Payment"],
                    parameters: [
                        {
                            in: "path",
                            name: "paymentId",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The payment ID"
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/payment"
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Payment updated successfully"
                        },
                        "400": {
                            description: "Invalid input data"
                        },
                        "404": {
                            description: "Payment not found"
                        }
                    }
                },
                delete: {
                    summary: "Delete a payment",
                    tags: ["Payment"],
                    parameters: [
                        {
                            in: "path",
                            name: "paymentId",
                            schema: {
                                type: "string"
                            },
                            required: true,
                            description: "The payment ID"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Payment deleted successfully"
                        },
                        "404": {
                            description: "Payment not found"
                        }
                    }
                }
            },
            "/api/v1/bus/": {
                post: {
                    tags: ["Bus"],
                    summary: "Create a bus",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["regNumber", "name"],
                                    properties: {
                                        id: {
                                            type: "string",
                                            example: "6365293491f78b9b00a673b6"
                                        },
                                        regNumber: {
                                            type: "string",
                                            example: "GR-2637-23"
                                        },
                                        name: {
                                            type: "string",
                                            example: "OheneBa"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Bus created successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Invalid input"
                                        }
                                    }
                                }
                            }
                        },
                        "409": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Bus already exists"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                get: {
                    tags: ["Bus"],
                    summary: "Get all buses",
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "string",
                                                    example: "6365293491f78b9b00a673b6"
                                                },
                                                regNumber: {
                                                    type: "string",
                                                    example: "GR-2637-23"
                                                },
                                                name: {
                                                    type: "string",
                                                    example: "OheneBa"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/bus/{id}": {
                get: {
                    tags: ["Bus"],
                    summary: "Get a bus by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "6365293491f78b9b00a673b6"
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                example: "6365293491f78b9b00a673b6"
                                            },
                                            regNumber: {
                                                type: "string",
                                                example: "GR-2637-23"
                                            },
                                            name: {
                                                type: "string",
                                                example: "OheneBa"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Bus not found"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    tags: ["Bus"],
                    summary: "Update a bus by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "6365293491f78b9b00a673b6"
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        regNumber: {
                                            type: "string",
                                            example: "GR-2637-24"
                                        },
                                        name: {
                                            type: "string",
                                            example: "NewBusName"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Bus updated successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Bus not found"
                                        }
                                    }
                                }
                            }
                        },
                        "409": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Bus already exists"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    tags: ["Bus"],
                    summary: "Delete a bus by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "6365293491f78b9b00a673b6"
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Bus deleted successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Bus not found"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/bus/seatsfilled/{id}": {
                put: {
                    tags: ["Bus"],
                    summary: "Update filled seats of a bus by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "6365293491f78b9b00a673b6"
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        filledSeats: {
                                            type: "integer",
                                            example: 25
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Filled seats of the bus updated successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Bus not found"
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Invalid input"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/bus/resetbusseats/{id}": {
                put: {
                    tags: ["Bus"],
                    summary: "Reset seats of a bus by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            example: "6365293491f78b9b00a673b6"
                        }
                    ],
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "Seats of the bus reset successfully"
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Unauthorized"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            err: "Bus not found"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ["./docs/paths/*.ts"]
};

export const specs = swaggerJSDoc(swaggerOptions);
