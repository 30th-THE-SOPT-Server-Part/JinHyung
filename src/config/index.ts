// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT as string, 10) as number,

  /**
   * MongoDB URI
   */
  mongoURI: process.env.MONGODB_URI as string,
};