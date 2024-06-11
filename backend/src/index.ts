import app from "./app";
import connectToMongoDB from "./db/connectToMongoDB";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
