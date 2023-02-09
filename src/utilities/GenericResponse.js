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

export default {
  sendErrorWithAuthorization,
  sendAcknowledgement,
};
