import _mongoose, { connect } from "mongoose";

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedConnection = globalThis.mongoose;

if (!cachedConnection) {
  cachedConnection = globalThis.mongoose = { conn: null, promise: null };
}

const connectToDB = async () => {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    const option = {
      bufferCommands: false,
      dbName: "personal-planner",
    };

    cachedConnection.promise = connect(MONGODB_URI!, option)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Connecting to database failed", error);
        throw error;
      });
  }

  try {
    cachedConnection.conn = await cachedConnection.promise;
  } catch (error) {
    cachedConnection.promise = null;
    console.error("❌ Connection promise failed", error);
    throw error;
  }

  return cachedConnection.conn;
};

export default connectToDB;
