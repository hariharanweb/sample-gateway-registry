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

const verifySubscribe = async (subscriberUrl, requestId, signingPublicKey) => {
  try {
    const responseFromUrl = await Api.doGet(`${subscriberUrl}/ondc-site-verification.html`);
    const signatureKey = fetchSignatureContent(responseFromUrl);

    if (SignatureHelper
      .verify(requestId, signingPublicKey, signatureKey)) {
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
