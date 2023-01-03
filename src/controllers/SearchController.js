import Api from '../api/Api';
import registry from '../registry/registry.json';
import LoggingService from '../services/LoggingService';
import Utils from '../utils/Utils';
import auth from '../utils/auth';

const search = (req, res) => {
  const logger = LoggingService.getLogger('Search');
  logger.debug(`Search called with ${JSON.stringify(req.body)}`);

  logger.debug('Before Authorize call');
  auth.authorize(req, "sample_mobility_bap").then((x) => {
    logger.debug('On Fullfilled Promise of Authorize call');
    const bppSubscribers = registry.filter(
      (entry) => entry.status === 'SUBSCRIBED' && entry.type === 'BPP',
    );
    bppSubscribers.forEach((bppSubscriber) => {
      logger.debug(`Calling BPP ${bppSubscriber.subscriber_id}`);
      const url = `${bppSubscriber.subscriber_url}/search`;

      Api.doPost(url, req.body);
    });
    res.send(Utils.successfulAck);
  }).catch((err) => {
    logger.debug('On Rejected Promise of Authorize call');
    res.status(401).send('Error');
  });
};

export default {
  search,
};
