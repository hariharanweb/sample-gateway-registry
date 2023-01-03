import Api from '../api/Api';
import LoggingService from '../services/LoggingService';
import authVerifier from '../utilities/SignVerify/AuthHeaderVerifier';
import GenericResponse from './GenericResponse';

const onSearch = async (req, res) => {
  const logger = LoggingService.getLogger('OnSearchController');
  logger.debug(`on_search called with ${JSON.stringify(req.body)}`);

  // TODO 3 : need to make BPP generic enough
  const publicKey = await GenericResponse.getPublicKey('sample_mobility_bpp');
  authVerifier.authorize(req, publicKey).then(() => {
    logger.debug('Request Authorized Successfully.');
    const bapUrl = `${req.body.context.bap_uri}/on_search`;
    Api.doPost(bapUrl, JSON.stringify(req.body));
    GenericResponse.sendAcknowledgement(res);
  }).catch((err) => {
    logger.debug(`Authorization Failed: ${err}`);
    GenericResponse.sendErrorWithAuthorization(res);
  });
};

export default {
  onSearch,
};
