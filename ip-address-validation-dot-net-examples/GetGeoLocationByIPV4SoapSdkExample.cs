using ip_address_validation_dot_net.SOAP;
using IPAVReference;
using System;

namespace ip_address_validation_dot_net_examples
{
    internal static class GetGeoLocationByIPV4SoapSdkExample
    {
        public static void Go(string licenseKey, bool isLive)
        {
            Console.WriteLine("\r\n-------------------------------------------------------");
            Console.WriteLine("IP Address Validation - GetGeoLocationByIPV4 - SOAP SDK");
            Console.WriteLine("-------------------------------------------------------");

            string IPAddress = "72.205.70.231";

            Console.WriteLine("\r\n* Input *\r\n");
            Console.WriteLine($"IP Address  : {IPAddress}");
            Console.WriteLine($"License Key : {licenseKey}");
            Console.WriteLine($"Is Live     : {isLive}");

            var ipav4 = new GetGeoLocationByIPV4Validation(isLive);
            IP4 response = ipav4.GetGeoLocationByIPV4(IPAddress, licenseKey).Result;
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
        }
    }
}