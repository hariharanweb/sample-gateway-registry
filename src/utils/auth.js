import sodium from 'libsodium-wrappers';
import registry from '../registry/registry.json';
import LoggingService from '../services/LoggingService';

const logger = LoggingService.getLogger();

const getSignature = (headers) => {
  const authorizationHeader = headers['x-gateway-authorization'];
  logger.debug(`THE authorization header is ${authorizationHeader}`);
  const parts = authorizationHeader.split(',');
  logger.debug(`The parts are...${parts}`);
  if (!parts || Object.keys(parts).length === 0) {
    throw (new Error('Header parsing failed'));
  }
  const dict = {};
  for (let i = 0; i < parts.length; i++) {
    const test = parts[i].split('=');
    dict[test[0]] = test[1];
  }
  logger.debug(dict);
  const leng = dict.signature.length;
  logger.debug(dict.signature.slice(1, leng));

  return dict.signature.slice(1, leng);
};

const getExpires = (headers) => {
  const authorizationHeader = headers['x-gateway-authorization'];
  logger.debug(`THE authorization header is ${authorizationHeader}`);
  const parts = authorizationHeader.split(',');
  logger.debug(`The parts are...${parts}`);
  if (!parts || Object.keys(parts).length === 0) {
    throw (new Error('Header parsing failed'));
  }
  const dict = {};
  for (let i = 0; i < parts.length; i++) {
    const test = parts[i].split('=');
    dict[test[0]] = test[1];
  }
  logger.debug(dict);
  const leng = dict.expires.length;
  logger.debug(dict.expires.slice(1, (leng)));

  return dict.expires.slice(1, (leng-1));
};

const getCreated = (headers) => {
  const authorizationHeader = headers['x-gateway-authorization'];
  logger.debug(`THE authorization header is ${authorizationHeader}`);
  const parts = authorizationHeader.split(',');
  logger.debug(`The parts are...${parts}`);
  if (!parts || Object.keys(parts).length === 0) {
    throw (new Error('Header parsing failed'));
  }
  const dict = {};
  for (let i = 0; i < parts.length; i++) {
    const test = parts[i].split('=');
    dict[test[0]] = test[1];
  }
  logger.debug(dict);
  const leng = dict.created.length;
  logger.debug(dict.created.slice(1, (leng-1)));

  return dict.created.slice(1, (leng-1));
};

const verify = (msg, publicKey, signature) => {
  const verification = sodium.crypto_sign_verify_detached(
    sodium.to_base64(signature, sodium.base64_variants.ORIGINAL),
    msg,
    sodium.to_base64(publicKey, sodium.base64_variants.ORIGINAL),
  );
  return verification;
};
const getPublicKey = () => {
  const bapSubscriber = registry.filter(
    (entry) => entry.subscriber_id === "sample_mobility_bap",
  );
  console.log("bap subscriber " + JSON.stringify(bapSubscriber));
  const publicKey = `${bapSubscriber[0].signing_public_key}`;
  return publicKey;
};

const createSigningString = async (body, created, expires) => {
  await sodium.ready;
  const digest = sodium.crypto_generichash(64, sodium.from_string(body));
  const digestBase64 = sodium.to_base64(digest, sodium.base64_variants.ORIGINAL);
  const signingString = `(created): ${created}
(expires): ${expires}
digest: BLAKE-512=${digestBase64}`;
  return signingString;
};

const authorize = async (req) => {
  logger.debug(`The request header is ${JSON.stringify(req.headers)}`);
  const signature = getSignature(req.headers);
  const created = getCreated(req.headers);
  const expires = getExpires(req.headers);
  if (typeof signature === 'undefined') {
    return false;
  }
  const msg = JSON.stringify(req.body);
  const publicKey = getPublicKey();
  const signingString = await createSigningString(msg, created.toString(), expires.toString());
  return verify(signingString, publicKey, signature);
};

export default {
  authorize,
};
