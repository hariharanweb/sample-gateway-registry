// Verification
import crypto from "crypto";
import fs from "fs";
import path from "path";
import LoggingService from "../services/LoggingService";

const logger = LoggingService.getLogger();

const Auth = (req) => {
  logger.debug(`The request header is ${JSON.stringify(req.headers)}`);

  const signature = getSignature(req.headers);

  if (typeof signature === "undefined") {
    return false;
  }
  const msg = JSON.stringify(req.body);

  const publicKey = getPublicKey();

  return verify(msg,publicKey,signature);
};
 
const getSignature=(headers)=>{
  const authorizationHeader = headers["x-gateway-authorization"];
  console.log("THE authorization header is " + authorizationHeader);
  const parts = authorizationHeader.split(",");
  console.log("The parts are..." + parts )
  var dict = {};
  for(let i = 0; i< parts.length ; i++){
    var test = parts[i].split("=");
    dict[test[0]] = test[1]
  }
  console.log(dict);
  const leng = dict['signature'].length;
  console.log(dict['signature'].slice(1,leng));
  return dict['signature'].slice(1,leng);
}

const verify=(msg,publicKey,signature)=>{
    let verification = crypto.verify(
        null,
        Buffer.from(msg),
        publicKey,
        Buffer.from(signature, "base64")
      );
    logger.debug(`The signature verification is ${verification}`); 
    return verification;
}
const getPublicKey= () => {
    return fs.readFileSync(
        path.resolve("./src/CertificateBAP/publicKey.txt"),
        "utf-8"
      );
}

export default {
  Auth,
};
