import 'dotenv/config';
import app from './app';
import dbConnection from './db/db';

const port = process.env.PORT || 8080;


dbConnection();

app.listen(port, () => {
    console.log(`server is runnig on port : ${port}`);
});