
from suds.client import Client
from suds import WebFault
from suds.sudsobject import Object

class GetGeoLocationByIPV4Soap:
    def __init__(self, license_key: str, is_live: bool, timeout_ms: int = 10000):
        """
        license_key: Service Objects IPAV license key.
        is_live: Whether to use live or trial endpoints
        timeout_ms: SOAP call timeout in milliseconds
        """
        self._timeout_s = timeout_ms / 1000.0  # Convert to seconds
        self._is_live = is_live
        self.license_key = license_key

        # WSDL URLs for primary and backup endpoints
        self._primary_wsdl = (
            "https://sws.serviceobjects.com/GPP/soap.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/GPP/soap.svc?wsdl"
        )
        self._backup_wsdl = (
            "https://swsbackup.serviceobjects.com/GPP/soap.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/GPP/soap.svc?wsdl"
        )

    def get_geo_location_by_ip_v4(self, ip_address: str) -> Object:
        """
        Calls the IP Address Validation GetGeoLocationByIP_V4 SOAP API to retrieve geographic location, proxy, host name, and US region information.

        Parameters:
            ip_address (str): The IP address to look up, e.g., "209.85.173.104".
            license_key: Service Objects IPAV license key.
            is_live: Whether to use live or trial endpoints
            timeout_ms: SOAP call timeout in milliseconds

        Returns:
            Object: Parsed SOAP response with geolocation information or error details.
        """
        # Common kwargs for both calls
        call_kwargs = dict(
            IPAddress=ip_address,
            LicenseKey=self.license_key
        )

        # Attempt primary
        try:
            client = Client(self._primary_wsdl, timeout=self._timeout_s)
            # Override endpoint URL if needed:
            # client.set_options(location=self._primary_wsdl.replace('?wsdl','/soap'))
            response = client.service.GetLocationByIP_V4(**call_kwargs)

            # If response invalid or Error.Number == "4", trigger fallback
            if response is None or (hasattr(response, 'Error') and response.Error and response.Error.Number == '4'):
                raise ValueError("Primary returned no result or fatal Error.Number=4")

            return response

        except (WebFault, ValueError, Exception) as primary_ex:
            try:
                client = Client(self._backup_wsdl, timeout=self._timeout_s)
                response = client.service.GetLocationByIP_V4(**call_kwargs)

                if response is None:
                    raise ValueError("Backup returned no result")

                return response

            except (WebFault, Exception) as backup_ex:
                # Raise a combined error if both attempts fail
                msg = (
                    "Both primary and backup endpoints failed.\n"
                    f"Primary error: {str(primary_ex)}\n"
                    f"Backup error: {str(backup_ex)}"
                )
                raise RuntimeError(msg)