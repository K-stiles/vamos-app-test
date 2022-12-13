//User Schema
export const User = {
    type: "object",
    required: ["phone"],
    properties: {
      id: {
        type: "string",
        description: "Auto-generated id of the user",
      },
      phone: {
        type: "string",
        description: "The phone number of the user",
      },
      username: {
        type: "string",
        description: "username of the user",
      },
      isVerifies: {
        type: "boolean",
        description: "The verification status of the user",
      },
      profile: {
        type: "string",
        description: "The user's profile picture url",
      },
    },
    example: {
      id: "6365043491f58b9b00a593b6",
      phone: "233055323456",
      username: "Jane  Doe",
      isVerified: true,
      profile: "https://dwbshjbds.com/bedhsvjb",
    },
  }


  //Trip Schema
  export const Trip ={
    type: "object",
    properties:{
      id: {
        type: "string",
        description: "Auto-generated id of the trip",
      },
      destinationRegion:{
        type: "string",
        description: "The destinationRegion of the trip"
      },
      arrivalRegion:{
        type: "string",
        description: "The arrivalRegion of the trip"
      },
      destination:{
        type: "string",
        description: "The destination of the trip"
      },
      arrival:{
        type: "string",
        description: "The arrival of the trip"
      },
      departureDate:{
        type: "string",
        description: "The departureDate of the trip"
      },
      arrivalDate:{
        type: "string",
        description: "The arrivalDate of the trip"
      },
      departureTime:{
        type: "string",
        description: "The departureTime of the trip"
      },
      arrivalTime:{
        type: "string",
        description: "The arrivalTime of the trip"
      },
      duration:{
        type: "string",
        description: "The duration of the trip"
      },
      distance:{
        type: "string",
        description: "The distance of the trip"
      },
    },
    example:{
      id: "6363b08b76622e528d76e5ed",
      destinationRegion:"Greater Accra",
      arrivalRegion:"Northern",
      destination:"Accra",
      arrival:"Tamale",
      departureDate:"8 Nov. 2022",
      arrivalDate:"8 Nov. 2022",
      departureTime: "7:00 am",
      arrivalTime: "8:00 pm",
      duration: "10 hr 41 min",
      distance: "613.2 km"
    }
  }
