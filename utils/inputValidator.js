export const validateRegInput = (phone, username, Password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (phone.trim() === "") {
    errors.phone = "Phone number field must not be empty";
  }
  // else {
  //   const regEx = /^(?:(?!233)\d{10}|233\d{9})$/;
  //   if (!phone.match(regEx)) {
  //     errors.phone = "Phone number must be valid";
  //   }
  // }

  if (Password === "") {
    errors.password = "Password field must not empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateInInput = (phone, password) => {
  const errors = {};
  if (phone.trim() === "") {
    errors.phone = "Phone field must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password field must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
