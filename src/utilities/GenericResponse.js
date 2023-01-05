// import registry from '../registry/registry.json';
import LoggingService from '../services/LoggingService';

const logger = LoggingService.getLogger('GenericResponse');

const sendAcknowledgement = (res) => {
  logger.debug('Sending Acknowledgement');
  res.send({
    message: {
      ack: {
        status: 'ACK',
      },
    },
  });
};

const sendErrorWithAuthorization = (res) => {
  logger.debug('Sending Error Response');
  res.status(401).send('Error');
};

// const getPublicKey = async (subscriberId) => {
//   const subscriber = registry.filter(
//     (entry) => entry.subscriber_id === subscriberId,
//   );
//   logger.debug(`subscriber ${JSON.stringify(subscriber)}`);
//   const publicKey = `${subscriber[0].signing_public_key}`;
//   logger.debug(`public Key: ${publicKey}`);
//   return publicKey;
// };

export default {
  sendErrorWithAuthorization,
  sendAcknowledgement,
};
