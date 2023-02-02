import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment';
import Api from '../api/Api';
import LoggingService from './LoggingService';
import * as data from '../registry/registry.json';

dotenv.config();

const logger = LoggingService.getLogger('SubscribeService');

const generateUpdatedRegistryData = () => {
  const registryArray = [];
  Object.values(data)[0].forEach((element) => {
    registryArray.push(element);
  });
  registryArray.push({
    subscriber_id: process.env.SUBSCRIBER_ID,
    status: 'SUBSCRIBED',
    ukId: '111-222-299',
    subscriber_url: 'http://localhost:4010',
    country: process.env.COUNTRY,
    domain: 'mobility',
    valid_from: process.env.VALID_FROM,
    valid_until: process.env.VALID_UNTIL,
    type: process.env.NETWORK_PARTICIPANT_TYPE,
    signing_public_key: process.env.PUBLIC_KEY,
    encr_public_key: '',
    created: '2022-08-08T16:19:25.717Z',
    updated: moment().format(),
    br_id: '111-222-333',
    city: process.env.NETWORK_PARTICIPANT_CITY_CODE,
  });
  return registryArray;
};

const insertDataIntoRegistryJson = (registryArray) => {
  const updatedData = JSON.stringify(registryArray);
  const filename = fileURLToPath(import.meta.url);

  const dirname = path.dirname(filename);
  /* eslint-disable no-console */
  const registryFilePath = path.join(dirname, '../registry/registry.json');
  console.log(registryFilePath);
  fs.writeFileSync(registryFilePath, updatedData);
  /* eslint-disable no-console */
  console.log(updatedData);
};

const addDataInRegistory = () => {
  const updatedRegistryArray = generateUpdatedRegistryData();
  insertDataIntoRegistryJson(updatedRegistryArray);
};

const handlingAcknowledgment = async () => {
  const url = `${process.env.BUYER_APP_URL}/on_subscribe`;
  const status = {
    status: 'Success',
  };
  const response = await Api.doPost(url, JSON.stringify(status));
  const responseText = await response.text();
  logger.debug(`Response ${responseText}`);
  logger.debug('Success');
};

const subscribe = async () => {
  addDataInRegistory();
  handlingAcknowledgment();
};

export default {
  subscribe,
};
