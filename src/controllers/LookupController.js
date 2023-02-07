import RegistryService from '../services/RegistryService';

const lookup = (req, res) => {
  // const filter = req.body;
  res.send(RegistryService.getRegistry());
};

export default {
  lookup,
};
