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
# 1. Build the input
#
#  Required fields:
#               license_key
#               is_live
# 
# Optional:
#       ip_address
#       timeout_seconds (default: 15)

from get_geo_location_by_ipv4_rest import get_geo_location_by_ipv4

ip_address = "72.205.70.231"
timeout_seconds = 15
is_live = True
license_key = "YOUR LICENSE KEY"

# 2. Call the method.
 response = get_geo_location_by_ipv4(ip_address, license_key, is_live, timeout_seconds)

# 3. Inspect results.
if response.Error is None:
    print("\n* GeoLocation Info *\n")
    if response:
        print(f"Certainty      : {response.Certainty}")
        print(f"City           : {response.City}")
        print(f"Region         : {response.Region}")
        print(f"Country        : {response.Country}")
        print(f"Country ISO3   : {response.CountryISO3}")
        print(f"Country ISO2   : {response.CountryISO2}")
        print(f"Postal Code    : {response.PostalCode}")
        print(f"Metro Code     : {response.MetroCode}")
        print(f"DMA            : {response.DMA}")
        print(f"State FIPS     : {response.StateFIPS}")
        print(f"County FIPS    : {response.CountyFIPS}")
        print(f"Latitude       : {response.Latitude}")
        print(f"Longitude      : {response.Longitude}")
        print(f"Is Proxy       : {response.IsProxy}")
        print(f"Proxy Type     : {response.ProxyType}")
        print(f"Possible Mobile: {response.PossibleMobileDevice}")
        print(f"ISP            : {response.ISP}")
        print(f"Netblock Owner : {response.NetblockOwner}")
        print(f"Host Names     : {response.HostNames}")
        print(f"IP Note Codes  : {response.IPNoteCodes}")
        print(f"IP Notes       : {response.IPNotes}")
        print(f"Debug          : {response.Debug}")
    else:
        print("No geolocation info found.")
else:
    print("\n* Error *\n")
    print(f"Error Desc    : {response.Error.Desc}")
    print(f"Error Number  : {response.Error.Number}")
    print(f"Error Location: {response.Error.Location}")
```

