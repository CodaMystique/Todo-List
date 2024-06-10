declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    MONGO_DB_URI: string;
    PORT?: string;
  }
}
