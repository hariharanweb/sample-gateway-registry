import registry from '../registry/registry.json';
import LoggingService from './LoggingService';

const logger = LoggingService.getLogger('LookUpService');

const getPublicKey = async (subscriberId) => {
  const subscriber = registry.filter(
    (entry) => entry.subscriber_id === subscriberId,
  );
  logger.debug(`subscriber ${JSON.stringify(subscriber)}`);
  const publicKey = `${subscriber[0].signing_public_key}`;
  logger.debug(`public Key: ${publicKey}`);
  return publicKey;
};

export default {
  getPublicKey,
};
