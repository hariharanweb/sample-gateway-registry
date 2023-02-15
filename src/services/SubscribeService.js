import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Api from '../api/Api';
import LoggingService from './LoggingService';
import RegistryService from './RegistryService';
import VerifyService from './VerifyService';

dotenv.config();

const logger = LoggingService.getLogger('SubscribeService');

const generateModifiedRegistryData = (req, subscriberId, createdAt) => {
  const generateRegistry = [];
  Object.values(RegistryService.getRegistry()).forEach((element) => {
    if (element.subscriber_id !== subscriberId) generateRegistry.push(element);
  });
  generateRegistry.push({
    subscriber_id: req.entity.subscriber_id,
    status: 'SUBSCRIBED',
    ukId: req.entity.unique_key_id,
    subscriber_url: req.network_participant[0].subscriber_url,
    country: req.entity.country,
    domain: req.network_participant[0].domain,
    valid_from: req.entity.key_pair.valid_from,
    valid_until: req.entity.key_pair.valid_until,
    type: req.network_participant[0].type,
    signing_public_key: req.entity.key_pair.signing_public_key,
    encr_public_key: req.entity.key_pair.encryption_public_key,
    created: createdAt,
    updated: req.timestamp,
    br_id: req.request_id,
    city: req.entity.gst.city_code[0],
  });
  return generateRegistry;
};

const generateUpdatedRegistryData = (req) => {
  const generateRegistry = [];
  Object.values(RegistryService.getRegistry()).forEach((element) => {
    generateRegistry.push(element);
  });
  generateRegistry.push({
    subscriber_id: req.entity.subscriber_id,
    status: 'SUBSCRIBED',
    ukId: req.entity.unique_key_id,
    subscriber_url: req.network_participant[0].subscriber_url,
    country: req.entity.country,
    domain: req.network_participant[0].domain,
    valid_from: req.entity.key_pair.valid_from,
    valid_until: req.entity.key_pair.valid_until,
    type: req.network_participant[0].type,
    signing_public_key: req.entity.key_pair.signing_public_key,
    encr_public_key: req.entity.key_pair.encryption_public_key,
    created: req.timestamp,
    updated: req.timestamp,
    br_id: req.request_id,
    city: req.entity.gst.city_code[0],
  });
  return generateRegistry;
};

const insertDataIntoRegistryJson = (registryArray) => {
  const updatedData = JSON.stringify(registryArray);
  const filename = fileURLToPath(import.meta.url);

  const dirname = path.dirname(filename);
  const registryFilePath = path.join(dirname, '../registry/registry.json');
  fs.writeFileSync(registryFilePath, updatedData);
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

const subscribe = async (req) => {
  const bapSubscriber = RegistryService.getRegistry().filter(
    (entry) => entry.subscriber_id === req.entity.subscriber_id,

  );

  const updatedRegistryArray = bapSubscriber.length !== 0
    ? generateModifiedRegistryData(req, bapSubscriber[0].subscriber_id, bapSubscriber[0].created)
    : generateUpdatedRegistryData(req);

  insertDataIntoRegistryJson(updatedRegistryArray);

  const subscribeUrl = req.network_participant[0].subscriber_url;
  const requestId = req.request_id;
  const signingPublicKey = req.entity.key_pair.signing_public_key;
  await VerifyService.verifySubscribe(subscribeUrl, requestId, signingPublicKey);
  handlingAcknowledgment();
};

export default {
  subscribe,
};
