import Api from "../api/Api";
import registry from "../registry/registry.json";
import LoggingService from "../services/LoggingService";
import Utils from "../utils/Utils";
import auth from "../utils/auth";
// import crypto from "crypto";
// import fs from "fs";
// import path from "path";

const search = (req, res) => {
  const logger = LoggingService.getLogger("Search");
  logger.debug(`Search called with ${JSON.stringify(req.body)}`);

  const authorization = auth.authorize(req);

  if (authorization) {
    const bppSubscribers = registry.filter(
      (entry) => entry.status === "SUBSCRIBED" && entry.type === "BPP"
    );
    bppSubscribers.forEach((bppSubscriber) => {
      logger.debug(`Calling BPP ${bppSubscriber.subscriber_id}`);
      const url = `${bppSubscriber.subscriber_url}/search`;
  
      Api.doPost(url, req.body);
    });
    res.send(Utils.successfulAck);
  }
  else {
    res.status(401).send("Error");
  }

};

export default {
  search,
};
