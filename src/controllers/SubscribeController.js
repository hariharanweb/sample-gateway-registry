import GenericResponse from '../utilities/GenericResponse';
import SubscribeService from '../services/SubscribeService';

const subscribe = async (req, res) => {
  console.log('IN CONTROLLER \n');
  SubscribeService.subscribe(req.body.message);
  GenericResponse.sendAcknowledgement(res);
};

export default {
  subscribe,
};
