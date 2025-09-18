from dataclasses import dataclass
from typing import Optional
import requests
from ipav_response import IPAVResponse, Error

# Endpoint URLs for IP Address Validation GetGeoLocationByIP_V4 REST API
primary_url = 'https://sws.serviceobjects.com/GPP/web.svc/JSON/GetLocationByIP_V4?'
backup_url = 'https://swsbackup.serviceobjects.com/GPP/web.svc/JSON/GetLocationByIP_V4?'
trial_url = 'https://trial.serviceobjects.com/GPP/web.svc/JSON/GetLocationByIP_V4?'

def get_geo_location_by_ipv4(
    ip_address: str,
    license_key: str,
    is_live: bool = True,
    timeout_seconds: int = 15
) -> IPAVResponse:
    """
    Call IP Address Validation GetGeoLocationByIP_V4 API to retrieve geographic location, proxy, host name, and US region information.

    Parameters:
        ip_address: The IP address to look up, e.g., "209.85.173.104".
        license_key: Your license key to use the service.
        is_live: Value to determine whether to use the live or trial servers (default: True).
        timeout_seconds: Timeout, in seconds, for the call to the service (default: 15).

    Returns:
        IPAVResponse: Parsed JSON response with geolocation information or error details.
    """
    params = {
        'IPAddress': ip_address,
        'LicenseKey': license_key
    }

    # Select the base URL: production vs trial
    url = primary_url if is_live else trial_url
    
    try:
        # Attempt primary (or trial) endpoint
        response = requests.get(url, params=params, timeout=timeout_seconds)
        response.raise_for_status()
        data = response.json()

        # If API returned an error in JSON payload, trigger fallback
        error = data.get('Error')
        if not (error is None or error.get('Number') != "4"):
          if is_live:
            # Try backup URL
            response = requests.get(backup_url, params=params, timeout=timeout_seconds)
            response.raise_for_status()
            data = response.json()

            # If still error, propagate exception
            if 'Error' in data:
                raise RuntimeError(f"IPAV service error: {data['Error']}")
          else:
              # Trial mode error is terminal
              raise RuntimeError(f"IPAV trial error: {data['Error']}")

        # Convert JSON response to IPAVResponse for structured access
        error = Error(**data.get('Error', {})) if data.get('Error') else None
        return IPAVResponse(
            IPAddress=data.get('IPAddress'),
            LicenseKey=data.get('LicenseKey'),
            Certainty=data.get('Certainty'),
            City=data.get('City'),
            Region=data.get('Region'),
            Country=data.get('Country'),
            CountryISO3=data.get('CountryISO3'),
            CountryISO2=data.get('CountryISO2'),
            PostalCode=data.get('PostalCode'),
            MetroCode=data.get('MetroCode'),
            DMA=data.get('DMA'),
            StateFIPS=data.get('StateFIPS'),
            CountyFIPS=data.get('CountyFIPS'),
            Latitude=data.get('Latitude'),
            Longitude=data.get('Longitude'),
            IsProxy=data.get('IsProxy'),
            ProxyType=data.get('ProxyType'),
            PossibleMobileDevice=data.get('PossibleMobileDevice'),
            ISP=data.get('ISP'),
            NetblockOwner=data.get('NetblockOwner'),
            HostNames=data.get('HostNames'),
            IPNoteCodes=data.get('IPNoteCodes'),
            IPNotes=data.get('IPNotes'),
            Debug=data.get('Debug'),
            Error=error
        )

    except requests.RequestException as req_exc:
        # Network or HTTP-level error occurred
        if is_live:
            try:
                # Fallback to backup URL on network failure
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
                if 'Error' in data:
                    raise RuntimeError(f"IPAV backup error: {data['Error']}") from req_exc

                # Convert JSON response to IPAVResponse for structured access
                error = Error(**data.get('Error', {})) if data.get('Error') else None
                return IPAVResponse(
                    IPAddress=data.get('IPAddress'),
                    LicenseKey=data.get('LicenseKey'),
                    Certainty=data.get('Certainty'),
                    City=data.get('City'),
                    Region=data.get('Region'),
                    Country=data.get('Country'),
                    CountryISO3=data.get('CountryISO3'),
                    CountryISO2=data.get('CountryISO2'),
                    PostalCode=data.get('PostalCode'),
                    MetroCode=data.get('MetroCode'),
                    DMA=data.get('DMA'),
                    StateFIPS=data.get('StateFIPS'),
                    CountyFIPS=data.get('CountyFIPS'),
                    Latitude=data.get('Latitude'),
                    Longitude=data.get('Longitude'),
                    IsProxy=data.get('IsProxy'),
                    ProxyType=data.get('ProxyType'),
                    PossibleMobileDevice=data.get('PossibleMobileDevice'),
                    ISP=data.get('ISP'),
                    NetblockOwner=data.get('NetblockOwner'),
                    HostNames=data.get('HostNames'),
                    IPNoteCodes=data.get('IPNoteCodes'),
                    IPNotes=data.get('IPNotes'),
                    Debug=data.get('Debug'),
                    Error=error
                )
            except Exception as backup_exc:
                raise RuntimeError("IPAV service unreachable on both endpoints") from backup_exc
        else:
            raise RuntimeError(f"IPAV trial error: {str(req_exc)}") from req_exc
