const getMongoDuplicateKeyError = (keyValue) => {
  let key = Object.keys(keyValue)[0];
  let value = keyValue[Object.keys(keyValue)[0]];
  return { key, value };
};

export { getMongoDuplicateKeyError };
