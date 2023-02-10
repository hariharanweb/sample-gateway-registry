import LoggingService from './LoggingService';

const logger = LoggingService.getLogger('VerifyService');

const verifySubscribe = (req) => {
  logger.debug(req.request_id);
  logger.debug(req.entity.key_pair.signing_public_key);
};

export default {
  verifySubscribe,
};
