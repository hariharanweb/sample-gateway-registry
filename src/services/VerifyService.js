import Api from '../api/Api';
import SignatureHelper from '../utilities/SignVerify/SignatureHelper';
import LoggingService from './LoggingService';

const logger = LoggingService.getLogger('VerifyService');

const fetchSignatureContent = (responseFromUrl) => {
  const keyInitRegex = "content='";
  const stringInit = responseFromUrl.match(keyInitRegex);
  const keyInitIndex = stringInit.index + keyInitRegex.length;

  const keyEndRegex = "=='";
  const stringEnd = responseFromUrl.match(keyEndRegex);
  const keyEndIndex = stringEnd.index + keyEndRegex.length - 1;

  const signatureKey = responseFromUrl.substring(keyInitIndex, keyEndIndex);

  return signatureKey;
};

const verifySubscribe = async (req) => {
  try {
    const responseFromUrl = await Api.doGet(`${req.network_participant[0].subscriber_url}/ondc-site-verification.html`);
    const signatureKey = fetchSignatureContent(responseFromUrl);

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
