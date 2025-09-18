from get_geo_location_by_ipv4_rest_sdk_example import get_geo_location_by_ipv4_rest_sdk_go
from get_geo_location_by_ipv4_soap_sdk_example import get_geo_location_by_ipv4_soap_sdk_go

if __name__ == "__main__":  
  # Your license key from Service Objects.  
  # Trial license keys will only work on the trial environments and production  
  # license keys will only work on production environments.  
  license_key = "LICENSE KEY"  
  is_live = False

  # IP Address Validation - GetGeoLocationByIP_V4 - REST SDK
  get_geo_location_by_ipv4_rest_sdk_go(is_live, license_key)

  # IP Address Validation - GetGeoLocationByIP_V4 - SOAP SDK
  get_geo_location_by_ipv4_soap_sdk_go(is_live, license_key)