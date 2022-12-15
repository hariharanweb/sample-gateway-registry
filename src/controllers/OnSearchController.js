import Api from '../api/Api';
import LoggingService from '../services/LoggingService';
import Utils from '../utils/Utils';

const onSearch = async (req, res) => {
  const logger = LoggingService.getLogger('OnSearchController');
  logger.debug(`on_search called with ${JSON.stringify(req.body)}`);
  const bapUrl = `${req.body.context.bap_uri}/on_search`;
  await Api.doPost(bapUrl, req.body);
  res.send(Utils.successfulAck);
};

export default {
  onSearch,
};
