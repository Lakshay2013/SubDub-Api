import express from "express";
import cookieParser from "cookie-parser";
import {PORT} from "./config/env.js";
import userrouter from "./routes/user.routes.js";
import subscriptionsrouter from "./routes/subscriptions.route.js";
import authsRouter from "./routes/auths.route.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./Middleware/error.middleware.js";
import arcjetMiddleware from "./Middleware/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())//reads cookies from incoming requests
app.use(arcjetMiddleware)

app.use('/api/v1/auth',authsRouter);
app.use('/api/v1/users',userrouter);
app.use('/api/v1/subscriptions',subscriptionsrouter);
app.use('/api/v1/workflows',workflowRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the subscription tracker API!');
});



app.listen(PORT,async () => {
    console.log(`Subscription tracker running on http://localhost:${PORT}`);

    await connectToDatabase()
});

export default app;

