import LoggingService from './LoggingService';
import RegistryService from './RegistryService';

const logger = LoggingService.getLogger('LookUpService');

const getPublicKey = async (subscriberId) => {
  const subscriber = RegistryService.getRegistry().filter(
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
