import express from 'express';
//import metricServerController from './controllers/metricServerController.js';
import metricServerRouter from './routes/metricServerRouter.js';
// import nodeExporter from './routes/nodeExporterRoute.js';
import cors from 'cors';
import path from 'path';
import portObj from './portForward.js';
import dotenv from 'dotenv';
dotenv.config();
// import mongoose from 'mongoose';
import runDb from './runDb.js';
import databaseRouter from './routes/databaseRouter.js';

const app = express();
const PORT = 3000;

// This starts data fetching and posting to database
runDb.postData();

// establish port forwarding for node-exporter; currently deprecated
// portObj.pForward();

app.use(cors());
/**
 * import routers
 */

/**
 * handle data parsing requirements
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * use route handlers
 */
// database endpoint both fetches metric data and ultimately
// posts to MongoDB
app.use('/database', databaseRouter);
app.use('/metricserver', metricServerRouter);
// app.use('/nodeExporter', nodeExporter);

/**
 * handle requests to the root
 */
app.get('/', (req, res) => {
  return res.sendStatus(200);
});

//to be moved into metricserverrouter file
// app.get('/pods', metricServerController.getPods, (req, res) => {
//   res.status(200).send(res.locals.pods);
// });

/**
 * catch requests to unknown routes
 */
app.use((req, res) => res.sendStatus(404));

/**
 * global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown error: ${err}`,
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start the server
 */
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;
