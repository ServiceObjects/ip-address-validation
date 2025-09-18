![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# IPVA - IP Address Validation

DOTS IP Address Validation (referred to as “IP Address Validation”) is a publicly available XML web service that provides lookup information about an IP address. The service provides city, state, country, latitude and longitude coordinates, and proxy, ISP, and network information.

IP Address Validation can help provide instant location verification to websites or data enhancement to contact lists.

## [Service Objects Website](https://serviceobjects.com)
## [Developer Guide/Documentation](https://www.serviceobjects.com/docs/)

# IPVA - GetGeoLocationByIP

GetGeoLocationByIP: Returns geographic location, proxy, host name and US region information for a given IP address.

## [GetGeoLocationByIP Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-ip-address-validation/ipav-operations/ipav-getgeolocationbyip_v4-recommended-operation/)

## GetGeoLocationByIP Request URLs (Query String Parameters)

>[!CAUTION]
>### *Important - Use query string parameters for all inputs.  Do not use path parameters since it will lead to errors due to optional parameters and special character issues.*


### JSON
#### Trial

https://trial.serviceobjects.com/GPP/web.svc/json/GetLocationByIP_V4?IPAddress=72.205.70.231&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/GPP/web.svc/json/GetLocationByIP_V4?IPAddress=72.205.70.231&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/GPP/web.svc/json/GetLocationByIP_V4?IPAddress=72.205.70.231&LicenseKey={LicenseKey}

### XML
#### Trial

https://trial.serviceobjects.com/GPP/web.svc/xml/GetLocationByIP_V4?IPAddress=72.205.70.231&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/GPP/web.svc/xml/GetLocationByIP_V4?IPAddress=72.205.70.231&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/GPP/web.svc/xml/GetLocationByIP_V4?IPAddress=72.205.70.231&LicenseKey={LicenseKey}
