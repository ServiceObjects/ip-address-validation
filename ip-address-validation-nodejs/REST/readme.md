![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# IPAV - IP Address Validation

DOTS IP Address Validation (referred to as “IP Address Validation”) is a publicly available XML web service that provides lookup information about an IP address. The service provides city, state, country, latitude and longitude coordinates, and proxy, ISP, and network information.

IP Address Validation can help provide instant location verification to websites or data enhancement to contact lists.

## [Service Objects Website](https://serviceobjects.com)

# IPAV - GetGeoLocationByIP_V4

Returns geographic location, proxy, host name and US region information for a given IP address

### [GetGeoLocationByIP_V4 Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-ip-address-validation/ipav-operations/ipav-getgeolocationbyip_v4-recommended-operation/)

## Library Usage

```
// 1. Build the input
//
//  Required fields:
//               licenseKey
//               isLive
// 
// Optional:
//       ipAddress
//       timeoutSeconds (default: 15)

import { GetGeoLocationByIPV4Client } from "../ip-address-validation-nodejs/REST/get_geo_location_by_ipv4_rest.js";

const ipAddress = "72.205.70.231";
const timeoutSeconds = 15;
const isLive = false;
const licenseKey = "YOUR LICENSE KEY";

// 2. Call the sync Invoke() method.
const response = await GetGeoLocationByIPV4Client.invoke(ipAddress, licenseKey, isLive, timeoutSeconds);

// 3. Inspect results.
if (response.Error) 
{
    console.log("\n* Error *\n");
    console.log(`Error Desc    : ${response.Error.Desc}`);
    console.log(`Error Number  : ${response.Error.Number}`);
    console.log(`Error Location: ${response.Error.Location}`);
    return;
}

console.log("\n* GeoLocation Info *\n");
if (response)
{
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
}
else
{
    console.log("No geolocation info found.");
}
```

