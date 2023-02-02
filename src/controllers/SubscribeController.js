import GenericResponse from '../utilities/GenericResponse';
import SubscribeService from '../services/SubscribeService';

const subscribe = async (req, res) => {
  GenericResponse.sendAcknowledgement(res);
  SubscribeService.subscribe(req.body.data.message);
};

export default {
  subscribe,
};
