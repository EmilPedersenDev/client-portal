module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
      },
      personalNumber: {
        type: Number,
      },
      email: {
        type: String,
      },
      companies: {
        type: [String],
      },
      role: {
        type: String,
      },
    },
    { timestamps: true }
  );

  const user = mongoose.model("User", userSchema);
  return user;
};
