import MD5 from "crypto-js/md5";
export const getHash = (ts, privateKey, publicKey) => {
    return MD5(ts + privateKey + publicKey).toString();
  };