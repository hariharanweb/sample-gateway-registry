import _ from 'lodash';
import registry from '../registry/registry.json';

const getRegisteredSellerApps = (context) => {
  const matchingSellerApps = _.filter(registry, { domain: context.domain });
  return matchingSellerApps;
};
export default {
  getRegisteredSellerApps,
};
