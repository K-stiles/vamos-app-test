/** User Schema  */
export const User = {
    type: "object",
    required: ["phone"],
    properties: {
        id: {
            type: "string",
            description: "Auto-generated id of the user"
        },
        phone: {
            type: "string",
            description: "The phone number of the user"
        },
        username: {
            type: "string",
            description: "username of the user"
        },
        isVerifies: {
            type: "boolean",
            description: "The verification status of the user"
        },
        profile: {
            type: "string",
            description: "The user's profile picture url"
        }
    },
    example: {
        id: "6365043491f58b9b00a593b6",
        phone: "233055323456",
        username: "Jane  Doe",
        isVerified: true,
        profile: "https://dwbshjbds.com/bedhsvjb"
    }
};

/** Trip Schema  */
export const Trip = {
    type: "object",
    properties: {
        id: {
            type: "string",
            description: "Auto-generated id of the trip"
        },
        destinationRegion: {
            type: "string",
            description: "The destinationRegion of the trip"
        },
        arrivalRegion: {
            type: "string",
            description: "The arrivalRegion of the trip"
        },
        destination: {
            type: "string",
            description: "The destination of the trip"
        },
        arrival: {
            type: "string",
            description: "The arrival of the trip"
        },
        departureDate: {
            type: "string",
            description: "The departureDate of the trip"
        },
        arrivalDate: {
            type: "string",
            description: "The arrivalDate of the trip"
        },
        departureTime: {
            type: "string",
            description: "The departureTime of the trip"
        },
        arrivalTime: {
            type: "string",
            description: "The arrivalTime of the trip"
        },
        duration: {
            type: "string",
            description: "The duration of the trip"
        },
        distance: {
            type: "string",
            description: "The distance of the trip"
        }
    },
    example: {
        id: "6363b08b76622e528d76e5ed",
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
};

/** Ticket Schema  */
export const Ticket = {
    type: "object",
    properties: {
        id: {
            type: "string",
            description: "Auto-generated id for the trip"
        },
        username: {
            type: "string",
            description: "Complete name of the user"
        },
        price: {
            type: "number",
            description: "Calculated price of the trip"
        },
        departureDateTime: {
            type: "string",
            description: "The departure date and time of the trip"
        },
        arrivalDateTime: {
            type: "string",
            description: "The arrival date and time of the trip"
        },
        contact: {
            type: "array",
            description: "The user's contact information"
        }
    },
    example: {
        id: "6365043491f58b9b00a673b6",
        username: "Jane  Doe",
        price: 100.0,
        departureDateTime: "15 August 2023, 1:20 pm",
        arrivalDateTime: "18 August 2023, 10:20 am",
        contact: ["Jane Doe", "jdoe@example.com", "0244408990"]
    }
};

/** Agency Schema  */
export const Agency = {
    type: "object",
    properties: {
        id: {
            type: "String",
            description: "Auto-generated id for the travel agency"
        },
        name: {
            type: "String",
            description: "name of the travel agency"
        },
        contact: {
            type: "array",
            description: "The user's contact information"
        }
    },
    example: {
        id: "6365043491f58b9b00a673b6",
        name: "Jane  Doe",
        contact: ["Jane Doe", "jdoe@example.com", "0244408990"]
    }
};

/** Bus Schema  */
export const Bus = {
    type: "object",
    properties: {
        id: {
            type: "String",
            description: "Auto-generated id for the Bus"
        },
        regNumber: {
            type: "String",
            description: "The bus registration number"
        },
        name: {
            type: "String",
            description: "Name of the bus"
        }
    },
    example: {
        id: "6365293491f78b9b00a673b6",
        regNumber: "GR-2637-23",
        name: "OheneBa"
    }
};

/** Admin Schema  */
export const Admin = {
    type: "object",
    properties: {
        id: {
            type: "string",
            description: "Auto-generated id for the admin"
        },
        username: {
            type: "string",
            description: "Admin username"
        },
        email: {
            type: "string",
            description: "Admin email"
        },
        phone: {
            type: "string",
            description: "Admin contact number"
        },
        profile: {
            type: "string",
            description: "The admin's profile picture url"
        },
        roles: {
            type: "number",
            description: "The admin's roles"
        }
    },
    example: {
        id: "1",
        username: "admin123",
        email: "admin@example.com",
        phone: "123-456-7890",
        profile: "https://example.com/admin-profile.jpg",
        roles: 1
    }
};

/** Subordinate Schema  */
export const SubAdmin = {
    type: "object",
    properties: {
        id: {
            type: "string",
            description: "Auto-generated id for the Subordinate"
        },
        username: {
            type: "string",
            description: "Subordinate username"
        },
        email: {
            type: "string",
            description: "Subordinate email"
        },
        phone: {
            type: "string",
            description: "Subordinate contact number"
        },
        profile: {
            type: "string",
            description: "The Subordinate's profile picture url"
        },
        roles: {
            type: "number",
            description: "The Subordinate's roles"
        }
    },
    example: {
        id: "1",
        username: "sub123",
        email: "sub@example.com",
        phone: "123-456-7890",
        profile: "https://example.com/sub-profile.jpg",
        roles: 1
    }
};

/** Payment Schema  */
export const Payment = {
    type: "object",
    properties: {
        id: {
            type: "string",
            description: "Auto-generated id for the payment"
        },
        amount: {
            type: "number",
            description: "Payment amount"
        },
        currency: {
            type: "string",
            description: "Currency of the payment"
        },
        date: {
            type: "string",
            format: "date-time",
            description: "Date of the payment"
        },
        status: {
            type: "string",
            description: "Payment status"
        }
    },
    example: {
        id: "6365043491f58b9b00a673b6",
        amount: 100.0,
        currency: "USD",
        date: "2023-08-24T12:00:00Z",
        status: "completed"
    }
};
