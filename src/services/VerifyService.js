import Api from '../api/Api';
import SignatureHelper from '../utilities/SignVerify/SignatureHelper';
import LoggingService from './LoggingService';

const logger = LoggingService.getLogger('VerifyService');

const verifySubscribe = async (req) => {
  try {
    logger.debug(req.request_id);
    logger.debug(req.entity.key_pair.signing_public_key);
    const response = Api.doGet(`${req.network_participant[0].subscriber_url}/ondc-site-verification.html`);

    const keyInitRegex = "content='";
    const stringInit = String(response).match(keyInitRegex);
    const keyInitIndex = stringInit.index + keyInitRegex.length;

    const keyEndRegex = "=='";
    const stringEnd = String(response).match(keyEndRegex);
    const keyEndIndex = stringEnd.index + keyEndRegex.length - 1;

    const signatureKey = response.substring(keyInitIndex, keyEndIndex);

    if (SignatureHelper
      .verify(req.request_id, req.entity.key_pair.signing_public_key, signatureKey)) {
      logger.debug('Sucessfully Verified');
      return;
    }
    throw Error('Verification Failed');
  } catch (err) {
    logger.error(`Error Triggered: ${err}`);
    throw err;
  }
};

export default {
  verifySubscribe,
};
