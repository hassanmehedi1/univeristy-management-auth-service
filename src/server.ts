import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  await mongoose.connect(config.database_url as string);

  console.log(`Database Connected Successfully`);

  app.listen(config.port, () => {
    console.log(`Application listening on port ${config.port}`);
  });

  try {
  } catch (error) {
    console.log("Failed to connect Database", error);
  }
}

main();
