import axios from 'axios';
import querystring from 'querystring';
import { IPAVResponse } from './ipav_response.js';

/**
 * @constant
 * @type {string}
 * @description The base URL for the live ServiceObjects IP Address Validation API service.
 */
const LiveBaseUrl = 'https://sws.serviceobjects.com/GPP/web.svc/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the backup ServiceObjects IP Address Validation API service.
 */
const BackupBaseUrl = 'https://swsbackup.serviceobjects.com/GPP/web.svc/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the trial ServiceObjects IP Address Validation API service.
 */
const TrialBaseUrl = 'https://trial.serviceobjects.com/GPP/web.svc/';

/**
 * <summary>
 * Checks if a response from the API is valid by verifying that it either has no Error object
 * or the Error.Number is not equal to '4'.
 * </summary>
 * <param name="response" type="Object">The API response object to validate.</param>
 * <returns type="boolean">True if the response is valid, false otherwise.</returns>
 */
const isValid = (response) => !response?.Error || response.Error.Number !== '4';

/**
 * <summary>
 * Constructs a full URL for the GetGeoLocationByIP_V4 API endpoint by combining the base URL
 * with query parameters derived from the input parameters.
 * </summary>
 * <param name="params" type="Object">An object containing all the input parameters.</param>
 * <param name="baseUrl" type="string">The base URL for the API service (live, backup, or trial).</param>
 * <returns type="string">The constructed URL with query parameters.</returns>
 */
const buildUrl = (params, baseUrl) =>
    `${baseUrl}JSON/GetLocationByIP_V4?${querystring.stringify(params)}`;

/**
 * <summary>
 * Performs an HTTP GET request to the specified URL with a given timeout.
 * </summary>
 * <param name="url" type="string">The URL to send the GET request to.</param>
 * <param name="timeoutSeconds" type="number">The timeout duration in seconds for the request.</param>
 * <returns type="Promise<IPAVResponse>">A promise that resolves to an IPAVResponse object containing the API response data.</returns>
 * <exception cref="Error">Thrown if the HTTP request fails, with a message detailing the error.</exception>
 */
const httpGet = async (url, timeoutSeconds) => {
  try {
    const response = await axios.get(url, { timeout: timeoutSeconds * 1000 });
    return new IPAVResponse(response.data);
  } catch (error) {
    throw new Error(`HTTP request failed: ${error.message}`);
  }
};

/**
 * <summary>
 * Provides functionality to call the ServiceObjects IP Address Validation API's GetGeoLocationByIP_V4 endpoint,
 * retrieving geographic location, proxy, host name, and US region information with fallback to a backup endpoint for reliability in live mode.
 * </summary>
 */
const GetGeoLocationByIPV4Client = {
    /**
     * <summary>
     * Asynchronously invokes the GetGeoLocationByIP_V4 API endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.Number == '4') in live mode.
     * </summary>
     * @param {string} IPAddress - The IP address to look up, e.g., "209.85.173.104".
     * @param {string} LicenseKey - Your license key to use the service.
     * @param {boolean} isLive - Value to determine whether to use the live or trial servers.
     * @param {number} timeoutSeconds - Timeout, in seconds, for the call to the service.
     * @returns {Promise<IPAVResponse>} - A promise that resolves to an IPAVResponse object.
     */
    async invokeAsync(IPAddress, LicenseKey, isLive = true, timeoutSeconds = 15) {
        const params = {
            IPAddress,
            LicenseKey
        };

        const url = buildUrl(params, isLive ? LiveBaseUrl : TrialBaseUrl);
        let response = await httpGet(url, timeoutSeconds);

        if (isLive && !isValid(response)) {
            const fallbackUrl = buildUrl(params, BackupBaseUrl);
            const fallbackResponse = await httpGet(fallbackUrl, timeoutSeconds);
            return isValid(fallbackResponse) ? fallbackResponse : response;
        }

        return response;
    },

    /**
     * <summary>
     * Synchronously invokes the GetGeoLocationByIP_V4 API endpoint by wrapping the async call
     * and awaiting its result immediately.
     * </summary>
     * @returns {IPAVResponse} - An IPAVResponse object with geographic location details or an error.
     */
    invoke(IPAddress, LicenseKey, isLive = true, timeoutSeconds = 15) {
        return (async () => await this.invokeAsync(
            IPAddress, LicenseKey, isLive, timeoutSeconds
        ))();
    }
};

export { GetGeoLocationByIPV4Client, IPAVResponse };