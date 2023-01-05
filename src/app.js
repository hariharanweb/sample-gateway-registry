import express from 'express';
import LookupController from './controllers/LookupController.js';
import OnSearchController from './controllers/OnSearchController.js';
import SearchController from './controllers/SearchController.js';
import LoggingService from './services/LoggingService.js';

const app = express();
const logger = LoggingService.getLogger();
logger.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug';
const port = process.env.GATEWAY_PORT ? process.env.GATEWAY_PORT : 1010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Gateway is running ${new Date()}`);
});

app.post('/search', SearchController.search);
app.post('/on_search', OnSearchController.onSearch);

app.post('/lookup', LookupController.lookup);

app.listen(port, () => {
  logger.info(`Gateway app listening on port ${port}`);

});
