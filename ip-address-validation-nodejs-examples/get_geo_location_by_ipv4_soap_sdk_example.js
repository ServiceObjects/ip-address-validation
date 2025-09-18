import { GetGeoLocationByIPV4Soap } from "../ip-address-validation-nodejs/SOAP/get_geo_location_by_ipv4_soap.js";

export async function getGeoLocationByIPV4SoapGO(licenseKey, isLive) {
  console.log("\n--------------------------------------------------------");
  console.log("IP Address Validation - GetGeoLocationByIP_V4 - SOAP SDK");
  console.log("--------------------------------------------------------");

  const ipAddress = "72.205.70.231";
  const timeoutSeconds = 15;

  console.log("\n* Input *\n");
  console.log(`IP Address     : ${ipAddress}`);
  console.log(`License Key    : ${licenseKey}`);
  console.log(`Is Live        : ${isLive}`);
  console.log(`Timeout Seconds: ${timeoutSeconds}`);

  try {
    const ipav4 = new GetGeoLocationByIPV4Soap(ipAddress, licenseKey, isLive, timeoutSeconds);
    const response = await ipav4.getGeoLocationByIPV4();

    if (response.Error) {
        console.log("\n* Error *\n");
        console.log(`Error Desc    : ${response.Error.Desc}`);
        console.log(`Error Number  : ${response.Error.Number}`);
        console.log(`Error Location: ${response.Error.Location}`);
        return;
    }

    console.log("\n* GeoLocation Info *\n");
    if (response) {
      console.log(`Certainty      : ${response.Certainty}`);
      console.log(`City           : ${response.City}`);
      console.log(`Region         : ${response.Region}`);
      console.log(`Country        : ${response.Country}`);
      console.log(`Country ISO3   : ${response.CountryISO3}`);
      console.log(`Country ISO2   : ${response.CountryISO2}`);
      console.log(`Postal Code    : ${response.PostalCode}`);
      console.log(`Metro Code     : ${response.MetroCode}`);
      console.log(`DMA            : ${response.DMA}`);
      console.log(`State FIPS     : ${response.StateFIPS}`);
      console.log(`County FIPS    : ${response.CountyFIPS}`);
      console.log(`Latitude       : ${response.Latitude}`);
      console.log(`Longitude      : ${response.Longitude}`);
      console.log(`Is Proxy       : ${response.IsProxy}`);
      console.log(`Proxy Type     : ${response.ProxyType}`);
      console.log(`Possible Mobile: ${response.PossibleMobileDevice}`);
      console.log(`ISP            : ${response.ISP}`);
      console.log(`Netblock Owner : ${response.NetblockOwner}`);
      console.log(`Host Names     : ${response.HostNames}`);
      console.log(`IP Note Codes  : ${response.IPNoteCodes}`);
      console.log(`IP Notes       : ${response.IPNotes}`);
      console.log(`Debug          : ${response.Debug}`);
    } else {
      console.log("No geolocation info found.");
    }

  
  } catch (e) {
    console.log(`\nException occurred: ${e.message}`);
  }
}