import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const getRegisteredSellerApps = (context) => {
  const filename = fileURLToPath(import.meta.url);

  const dirname = path.dirname(filename);
  const registryFilePath = path.join(dirname, '../registry/registry.json');
  fs.readFileSync(registryFilePath);
  const matchingSellerApps = _.filter(registryFilePath, { domain: context.domain });
  return matchingSellerApps;
};

const getRegistry = () => {
  const filename = fileURLToPath(import.meta.url);

  const dirname = path.dirname(filename);
  const registryFilePath = path.join(dirname, '../registry/registry.json');

  const value = fs.readFileSync(registryFilePath, { encoding: 'utf8' });
  return value;
};

export default {
  getRegisteredSellerApps,
  getRegistry,
};
