import RegistryService from '../services/RegistryService';

const lookup = (req, res) => {
  const filter = req.body;
  res.send(RegistryService.getRegistry(filter));
};

export default {
  lookup,
};
