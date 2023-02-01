import LoggingService from '../services/LoggingService';
import GenericResponse from '../utilities/GenericResponse';
import SubscribeService from '../services/SubscribeService';

const logger = LoggingService.getLogger('Subscribe');

const subscribe = async (req, res) => {
  logger.debug(`Subscribe called with ${JSON.stringify(req.body)}`);

  logger.debug('Request Authorized Successfully.');
  GenericResponse.sendAcknowledgement(res);
  SubscribeService.subscribe();
};

export default {
  subscribe,
};
