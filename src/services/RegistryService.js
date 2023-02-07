import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const getRegisteredSellerApps = (context) => {
  // const registry = require('../registry/registry.json')
  const filename = fileURLToPath(import.meta.url);

  const dirname = path.dirname(filename);
  const registryFilePath = path.join(dirname, '../registry/registry.json');
  fs.readFileSync(registryFilePath);
  const matchingSellerApps = _.filter(registryFilePath, { domain: context.domain });
  return matchingSellerApps;
};

const getRegistry = (filter) => {
  // const registry = require('../registry/registry.json')
  const filename = fileURLToPath(import.meta.url);

  const dirname = path.dirname(filename);
  const registryFilePath = path.join(dirname, '../registry/registry.json');

  const value = fs.readFileSync(registryFilePath, { encoding: 'utf8', flag: 'r' });
  // console.log('hereee');
  // console.log(value);
  const result = _.filter(value, filter);
  return result.replace('//', '');
};
export default {
  getRegisteredSellerApps,
  getRegistry,
};
