module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      companies: {
        type: [String],
      },
    },
    { timestamps: true }
  );

  const user = mongoose.model("User", userSchema);
  return user;
};
