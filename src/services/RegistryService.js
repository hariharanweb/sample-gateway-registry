import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const getRegistry = (filter) => {
  const filename = fileURLToPath(import.meta.url);

  const dirname = path.dirname(filename);
  const registryFile = process.env.PORT ? 'registryCloud.json' : 'registry.json'; //
  const registryFilePath = path.join(dirname, `../registry/${registryFile}`); //

  const value = fs.readFileSync(registryFilePath, { encoding: 'utf8' });
  const registry = JSON.parse(value);
  return _.filter(registry, filter);
};

export default {
  getRegistry,
};
