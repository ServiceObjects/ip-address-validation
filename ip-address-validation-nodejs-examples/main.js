import {getGeoLocationByIPV4GO} from "./get_geo_location_by_ipv4_rest_sdk_example.js";
import {getGeoLocationByIPV4SoapGO} from "./get_geo_location_by_ipv4_soap_sdk_example.js";

async function main() {
  //Your license key from Service Objects.
  //Trial license keys will only work on the
  //trail environments and production license
  //keys will only work on production environments.
  const licenseKey = "LICENSE KEY";
  const isLive = false;
 
  // IP Address Validation - GetGeoLocationByIP_V4 - REST SDK
  await getGeoLocationByIPV4GO(licenseKey, isLive);

  // IP Address Validation - GetGeoLocationByIP_V4 - SOAP SDK
  await getGeoLocationByIPV4SoapGO(licenseKey, isLive);
}
main().catch((err) => console.error("Error:", err));