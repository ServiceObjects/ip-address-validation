using ip_address_validation_dot_net_examples;

//Your license key from Service Objects.
//Trial license keys will only work on the
//trail environments and production license
//keys will only work on production environments.
string LicenseKey = "LICENSE KEY";

bool IsProductionKey = false;

// IP Address Validation - GetGeoLocationByIP_V4 - REST SDK
GetGeoLocationByIPV4RestSdkExample.Go(LicenseKey, IsProductionKey);

// IP Address Validation - GetGeoLocationByIP_V4 - SOAP SDK
GetGeoLocationByIPV4SoapSdkExample.Go(LicenseKey, IsProductionKey);