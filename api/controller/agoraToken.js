const dotenv = require("dotenv").config();
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('./agrora')

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

const generateRtcToken = (channel, uidd) => {
  // Rtc Examples
  const appID = APP_ID;
  const appCertificate = APP_CERTIFICATE;
  const channelName = channel ? channel : '7d72365eb983485397e3e3f9d460bdda';
  const uid = uidd ? uidd : 2882341273;
  // const account = accountt ? accountt : "2882341273";
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000)

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

  // Build token with uid
  const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
  console.log("Token With Integer Number Uid: " + tokenA);

  

  return tokenA;

  // Build token with user account
  // const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
  // console.log("Token With UserAccount: " + tokenB);
}


// ------------------------
const generateRtcToken2 = (channel, uidd, accountt) => {
  // Rtc Examples
  const appID = APP_ID;
  const appCertificate = APP_CERTIFICATE;
  const channelName = channel ? channel : '7d72365eb983485397e3e3f9d460bdda';
  const uid = uidd ? uidd : 2882341273;
  const account = accountt ? accountt : "2882341273";
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000)

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

  // Build token with uid
  // const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
  // console.log("Token With Integer Number Uid: " + tokenA);


  // Build token with user account
  const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
  console.log("Token With UserAccount: " + tokenB);

  return tokenB;
}


const generateRtmToken = (accountt) => {
  // Rtm Examples
  const appID = APP_ID;
  const appCertificate = APP_CERTIFICATE;
  const account = accountt ? accountt :"test_user_id";

  const expirationTimeInSeconds = 3600
  const currentTimestamp = Math.floor(Date.now() / 1000)

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

  const token = RtmTokenBuilder.buildToken(appID, appCertificate, account, RtmRole, privilegeExpiredTs);
  console.log("Rtm Token: " + token);

  return token;
}


module.exports = {
  generateRtcToken,
  generateRtcToken2,
  generateRtmToken
}

