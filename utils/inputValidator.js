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

export const adminInputValidate = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email filed must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password field must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const adminValidateRegInput = (email, phone, username, Password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email filed must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
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
