import _ from 'lodash';
import registry from '../registry/registry.json';

const getRegisteredSellerApps = (context) => {
  const matchingSellerApps = _.filter(registry, { domain: context.domain });
  return matchingSellerApps;
};

const getRegistry = (filter) => _.filter(registry, filter);
export default {
  getRegisteredSellerApps,
  getRegistry,
};
