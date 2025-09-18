using IPAVReference;

namespace ip_address_validation_dot_net.SOAP
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects IP Address Validation SOAP service's GetGeoLocationByIP_V4 operation,
    /// retrieving geographic location, proxy, host name, and US region information for a given IP address with fallback to a backup endpoint
    /// for reliability in live mode.
    /// </summary>
    public class GetGeoLocationByIPV4Validation
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/GPP/soap.svc/SOAP";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/GPP/soap.svc/SOAP";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/GPP/soap.svc/SOAP";

        private readonly string _primaryUrl;
        private readonly string _backupUrl;
        private readonly int _timeoutMs;
        private readonly bool _isLive;

        /// <summary>
        /// Initializes URLs/timeout/IsLive.
        /// </summary>
        public GetGeoLocationByIPV4Validation(bool isLive)
        {
            _timeoutMs = 10000;
            _isLive = isLive;

            _primaryUrl = isLive ? LiveBaseUrl : TrialBaseUrl;
            _backupUrl = isLive ? BackupBaseUrl : TrialBaseUrl;

            if (string.IsNullOrWhiteSpace(_primaryUrl))
                throw new InvalidOperationException("Primary URL not set.");
            if (string.IsNullOrWhiteSpace(_backupUrl))
                throw new InvalidOperationException("Backup URL not set.");
        }

        /// <summary>
        /// Retrieves geographic location, proxy, host name, and US region information for a given IP address.
        /// Consults IP address validation databases to provide details such as city, region, country, latitude, longitude,
        /// proxy status, ISP, and more. The operation returns a single response per IP address.
        /// </summary>
        /// <param name="IPAddress">The IP address to look up, e.g., "209.85.173.104".</param>
        /// <param name="LicenseKey">Your license key to use the service.</param>
        /// <returns>A <see cref="Task{IP4}"/> containing an <see cref="IP4"/> object with geographic location details or an error.</returns>
        /// <exception cref="Exception">Thrown if both primary and backup endpoints fail.</exception>
        public async Task<IP4> GetGeoLocationByIPV4(string IPAddress, string LicenseKey)
        {
            IPSOAPClient clientPrimary = null;
            IPSOAPClient clientBackup = null;

            try
            {
                // Attempt primary endpoint
                clientPrimary = new IPSOAPClient();
                clientPrimary.Endpoint.Address = new System.ServiceModel.EndpointAddress(_primaryUrl);
                clientPrimary.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                IP4 response = await clientPrimary.GetLocationByIP_V4Async(IPAddress, LicenseKey).ConfigureAwait(false);

                if (_isLive && !IsValid(response))
                {
                    throw new InvalidOperationException("Primary endpoint returned null or a fatal Number=4 error for GetGeoLocationByIP_V4");
                }
                return response;
            }
            catch (Exception primaryEx)
            {
                try
                {
                    clientBackup = new IPSOAPClient();
                    clientBackup.Endpoint.Address = new System.ServiceModel.EndpointAddress(_backupUrl);
                    clientBackup.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                    return await clientBackup.GetLocationByIP_V4Async(IPAddress, LicenseKey).ConfigureAwait(false);
                }
                catch (Exception backupEx)
                {
                    throw new Exception(
                        $"Both primary and backup endpoints failed.\n" +
                        $"Primary error: {primaryEx.Message}\n" +
                        $"Backup error: {backupEx.Message}");
                }
                finally
                {
                    clientBackup?.Close();
                }
            }
            finally
            {
                clientPrimary?.Close();
            }
        }

        private static bool IsValid(IP4 response) => response?.Error == null || response.Error.Number != "4";
    }
}