import sys
import os

sys.path.insert(0, os.path.abspath("../ip-address-validation-python/SOAP"))

from get_geo_location_by_ipv4_soap import GetGeoLocationByIPV4Soap

def get_geo_location_by_ipv4_soap_sdk_go(is_live: bool, license_key: str) -> None:
    print("\n--------------------------------------------------------")
    print("IP Address Validation - GetGeoLocationByIP_V4 - SOAP SDK")
    print("--------------------------------------------------------")

    ip_address = "72.205.70.231"
    timeout_seconds = 15

    print("\n* Input *\n")
    print(f"IP Address     : {ip_address}")
    print(f"License Key    : {license_key}")
    print(f"Is Live        : {is_live}")
    print(f"Timeout Seconds: {timeout_seconds}")

    try:
        service = GetGeoLocationByIPV4Soap(
            license_key,
            is_live,
            timeout_ms=timeout_seconds * 1000
        )
        response = service.get_geo_location_by_ip_v4(ip_address)

        if not hasattr(response, "Error"):
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
            if hasattr(response, "Error") and response.Error:
             print("\n* Error *\n")
             print(f"Error Desc    : {response.Error.Desc}")
             print(f"Error Number  : {response.Error.Number}")
             print(f"Error Location: {response.Error.Location}")

    except Exception as e:
        print(f"\nException occurred: {str(e)}")