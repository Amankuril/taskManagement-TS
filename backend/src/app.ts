import express from 'express';
import taskRouter from './routes/task.route';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api", taskRouter);

export default app;