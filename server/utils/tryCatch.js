export const tryCatch = (fn) => {
  return async (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
