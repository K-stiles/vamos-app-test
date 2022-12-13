export const errorBuilder = (error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Internal Server Error!";
  return res.status(errorStatus).json({
    error: true,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
};
