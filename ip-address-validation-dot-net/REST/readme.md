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
//               LicenseKey
//               IsLive
// 
// Optional:
//       IPAddress
//       TimeoutSeconds (default: 15)

using ip_address_validation_dot_net.REST;

GetGeoLocationByIPV4Client.GetGeoLocationByIPV4Input getGeoLocationInput = new(
    IPAddress: "72.205.70.231",
    LicenseKey: licenseKey,
    IsLive: true,
    TimeoutSeconds: 15
);

// 2. Call the sync Invoke() method.
 IPAVResponse response = GetGeoLocationByIPV4Client.Invoke(getGeoLocationInput);

// 3. Inspect results.
if (response.Error is null)
{
    Console.WriteLine("\r\n* GeoLocation Info *\r\n");
    Console.WriteLine($"Certainty      : {response.Certainty}");
    Console.WriteLine($"City           : {response.City}");
    Console.WriteLine($"Region         : {response.Region}");
    Console.WriteLine($"Country        : {response.Country}");
    Console.WriteLine($"Country ISO3   : {response.CountryISO3}");
    Console.WriteLine($"Country ISO2   : {response.CountryISO2}");
    Console.WriteLine($"Postal Code    : {response.PostalCode}");
    Console.WriteLine($"Metro Code     : {response.MetroCode}");
    Console.WriteLine($"DMA            : {response.DMA}");
    Console.WriteLine($"State FIPS     : {response.StateFIPS}");
    Console.WriteLine($"County FIPS    : {response.CountyFIPS}");
    Console.WriteLine($"Latitude       : {response.Latitude}");
    Console.WriteLine($"Longitude      : {response.Longitude}");
    Console.WriteLine($"Is Proxy       : {response.IsProxy}");
    Console.WriteLine($"Proxy Type     : {response.ProxyType}");
    Console.WriteLine($"Possible Mobile: {response.PossibleMobileDevice}");
    Console.WriteLine($"ISP            : {response.ISP}");
    Console.WriteLine($"Netblock Owner : {response.NetblockOwner}");
    Console.WriteLine($"Host Names     : {response.HostNames}");
    Console.WriteLine($"IP Note Codes  : {response.IPNoteCodes}");
    Console.WriteLine($"IP Notes       : {response.IPNotes}");
    Console.WriteLine($"Debug          : {response.Debug}");
}
else
{
    Console.WriteLine("\r\n* Error *\r\n");
    Console.WriteLine($"Error Desc    : {response.Error.Desc}");
    Console.WriteLine($"Error Number  : {response.Error.Number}");
    Console.WriteLine($"Error Location: {response.Error.Location}");
}
```

