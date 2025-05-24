// Helper for CUET email validation
module.exports = function (email) {
  // Example: check if email ends with '@cuet.ac.bd'
  return /@cuet\.ac\.bd$/.test(email);
};
