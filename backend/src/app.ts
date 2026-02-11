import express from 'express';
import taskRouter from './routes/task.route';

const app = express();

app.use(express.json());


app.use("/api", taskRouter);

export default app;