import Api from '../api/Api';
import LoggingService from '../services/LoggingService';
import authVerifier from '../utilities/SignVerify/AuthHeaderVerifier';
import GenericResponse from '../utilities/GenericResponse';
import LookUpService from '../services/LookUpService';
import RegistryService from '../services/RegistryService';

const logger = LoggingService.getLogger('Search');

const distributeRequestToBPP = (req) => {
  logger.debug('Distribute Request To BPP called.');
  const bppSubscribers = RegistryService.getRegistry().filter(
    (entry) => entry.status === 'SUBSCRIBED' && entry.type === 'BPP',
  );
  bppSubscribers.forEach((bppSubscriber) => {
    logger.debug(`Calling BPP ${bppSubscriber.subscriber_id}`);
    const url = `${bppSubscriber.subscriber_url}/search`;

    Api.doPost(url, JSON.stringify(req.body));
  });
};

const search = async (req, res) => {
  logger.debug(`Search called with ${JSON.stringify(req.body)}`);

  const publicKey = await LookUpService.getPublicKey(req.body.context.bap_id);
  authVerifier.authorize(req, publicKey).then(() => {
    logger.debug('Request Authorized Successfully.');
    distributeRequestToBPP(req);
    GenericResponse.sendAcknowledgement(res);
  }).catch((err) => {
    logger.debug(`Authorization Failed: ${err}`);
    GenericResponse.sendErrorWithAuthorization(res);
  });
};

export default {
  search,
};
