import jsSHA from "jssha";

const getAuthorizationHeader = function() {
	let AppID = import.meta.env.VITE_APP_ID;
	let AppKey = import.meta.env.VITE_APP_Key;

	let GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA("SHA-1", "TEXT", { hmacKey: { value: AppKey, format: "TEXT" } });
	ShaObj.update('x-date: ' + GMTString);
	let HMAC = ShaObj.getHash('B64');
	let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

	return { 'Authorization': Authorization, 'X-Date': GMTString};
}

export default getAuthorizationHeader;