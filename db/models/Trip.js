module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  return Trip;
};
