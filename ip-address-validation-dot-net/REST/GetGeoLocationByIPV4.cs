using System.Web;
using System.Threading.Tasks;

namespace ip_address_validation_dot_net.REST
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects IP Address Validation REST API's GetGeoLocationByIP_V4 endpoint,
    /// retrieving geographic location, proxy, host name, and US region information for a given IP address with fallback to a backup endpoint
    /// for reliability in live mode.
    /// </summary>
    public class GetGeoLocationByIPV4Client
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/GPP/web.svc/";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/GPP/web.svc/";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/GPP/web.svc/";

        /// <summary>
        /// Synchronously calls the GetGeoLocationByIP_V4 REST endpoint to retrieve geographic location information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.Number == "4") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including IP address and license key.</param>
        /// <returns>Deserialized <see cref="IPAVResponse"/>.</returns>
        public static IPAVResponse Invoke(GetGeoLocationByIPV4Input input)
        {
            // Use query string parameters so missing/optional fields don't break
            // the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            IPAVResponse response = Helper.HttpGet<IPAVResponse>(url, input.TimeoutSeconds);

            // Fallback on error in live mode
            if (input.IsLive && !IsValid(response))
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                IPAVResponse fallbackResponse = Helper.HttpGet<IPAVResponse>(fallbackUrl, input.TimeoutSeconds);
                return fallbackResponse;
            }

            return response;
        }

        /// <summary>
        /// Asynchronously calls the GetGeoLocationByIP_V4 REST endpoint to retrieve geographic location information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.Number == "4") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including IP address and license key.</param>
        /// <returns>Deserialized <see cref="IPAVResponse"/>.</returns>
        public static async Task<IPAVResponse> InvokeAsync(GetGeoLocationByIPV4Input input)
        {
            // Use query string parameters so missing/optional fields don't break
            // the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            IPAVResponse response = await Helper.HttpGetAsync<IPAVResponse>(url, input.TimeoutSeconds).ConfigureAwait(false);
            if (input.IsLive && !IsValid(response))
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                IPAVResponse fallbackResponse = await Helper.HttpGetAsync<IPAVResponse>(fallbackUrl, input.TimeoutSeconds).ConfigureAwait(false);
                return fallbackResponse;
            }

            return response;
        }

        // Build the full request URL, including URL-encoded query string
        public static string BuildUrl(GetGeoLocationByIPV4Input input, string baseUrl)
        {
            string qs = $"JSON/GetLocationByIP_V4?" +
                        $"IPAddress={HttpUtility.UrlEncode(input.IPAddress)}" +
                        $"&LicenseKey={HttpUtility.UrlEncode(input.LicenseKey)}";
            return baseUrl + qs;
        }

        // Check if the response is valid (no error or error code is not 4)
        private static bool IsValid(IPAVResponse response) =>
            response?.Error == null || response.Error.Number != "4";

        /// <summary>
        /// This is the basic operation for retrieving geographic location, proxy, host name, and US region information
        /// for a given IP address. It consults IP address validation databases to provide details such as city, region,
        /// country, latitude, longitude, proxy status, ISP, and more. The operation returns a single response per IP address.
        /// </summary>
        /// <param name="IPAddress">The IP address to look up, e.g., "209.85.173.104".</param>
        /// <param name="LicenseKey">Your license key to use the service.</param>
        /// <param name="IsLive">Option to use live service or trial service.</param>
        /// <param name="TimeoutSeconds">Timeout, in seconds, for the call to the service.</param>
        public record GetGeoLocationByIPV4Input(
            string IPAddress = "",
            string LicenseKey = "",
            bool IsLive = true,
            int TimeoutSeconds = 15
        );
    }
}