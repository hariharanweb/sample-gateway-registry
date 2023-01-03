import Api from '../api/Api';
import LoggingService from '../services/LoggingService';
import Utils from '../utils/Utils';
import auth from '../utils/auth';

const onSearch = async (req, res) => {
  const logger = LoggingService.getLogger('OnSearchController');
  logger.debug(`on_search called with ${JSON.stringify(req.body)}`);

  logger.debug('Before Authorize call');
  auth.authorize(req,"sample_mobility_bpp").then((x) => {
    logger.debug('On Fullfilled Promise of Authorize call');
    const url = `${req.body.context.bap_uri}/on_search`;
    Api.doPost(url, req.body);
    res.send(Utils.successfulAck);
  }).catch((err) => {
    logger.debug('On Rejected Promise of Authorize call');
    res.status(401).send('Error');
  });

};

export default {
  onSearch,
};
