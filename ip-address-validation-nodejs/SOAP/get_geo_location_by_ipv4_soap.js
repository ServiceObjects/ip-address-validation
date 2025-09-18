import { soap } from 'strong-soap';
import { IPAVResponse } from './ipav_response.js';

/**
 * <summary>
 * A class that provides functionality to call the ServiceObjects IP Address Validation SOAP service's GetGeoLocationByIP_V4 endpoint,
 * retrieving geographic location, proxy, host name, and US region information with fallback to a backup endpoint for reliability in live mode.
 * </summary>
 */
class GetGeoLocationByIPV4Soap {
    /**
     * <summary>
     * Initializes a new instance of the GetGeoLocationByIPV4Soap class with the provided input parameters,
     * setting up primary and backup WSDL URLs based on the live/trial mode.
     * </summary>
     * @param {string} IPAddress - The IP address to look up, e.g., "209.85.173.104".
     * @param {string} LicenseKey - Your license key to use the service.
     * @param {boolean} isLive - Value to determine whether to use the live or trial servers.
     * @param {number} timeoutSeconds - Timeout, in seconds, for the call to the service.
     * @throws {Error} Thrown if LicenseKey is empty or null.
     */
    constructor(IPAddress, LicenseKey, isLive = true, timeoutSeconds = 15) {

        this.args = {
            IPAddress,
            LicenseKey
        };

        this.isLive = isLive;
        this.timeoutSeconds = timeoutSeconds;

        this.LiveBaseUrl = "https://sws.serviceobjects.com/GPP/soap.svc?wsdl";
        this.BackupBaseUrl = "https://swsbackup.serviceobjects.com/GPP/soap.svc?wsdl";
        this.TrialBaseUrl = "https://trial.serviceobjects.com/GPP/soap.svc?wsdl";

        this._primaryWsdl = this.isLive ? this.LiveBaseUrl : this.TrialBaseUrl;
        this._backupWsdl = this.isLive ? this.BackupBaseUrl : this.TrialBaseUrl;
    }

    /**
     * <summary>
     * Asynchronously calls the GetGeoLocationByIP_V4 SOAP endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.Number == '4') in live mode
     * or if the primary call fails.
     * </summary>
     * <returns type="Promise<IPAVResponse>">A promise that resolves to an IPAVResponse object containing geographic location details or an error.</returns>
     * <exception cref="Error">Thrown if both primary and backup calls fail, with detailed error messages.</exception>
     */
    async getGeoLocationByIPV4() {
        try {
            const primaryResult = await this._callSoap(this._primaryWsdl, this.args);

            if (this.isLive && !this._isValid(primaryResult)) {
                console.warn("Primary returned Error.Number == '4', falling back to backup...");
                const backupResult = await this._callSoap(this._backupWsdl, this.args);
                return backupResult;
            }

            return primaryResult;
        } catch (primaryErr) {
            try {
                const backupResult = await this._callSoap(this._backupWsdl, this.args);
                return backupResult;
            } catch (backupErr) {
                throw new Error(`Both primary and backup calls failed:\nPrimary: ${primaryErr.message}\nBackup: ${backupErr.message}`);
            }
        }
    }

    /**
     * <summary>
     * Performs a SOAP service call to the specified WSDL URL with the given arguments,
     * creating a client and processing the response into an IPAVResponse object.
     * </summary>
     * <param name="wsdlUrl" type="string">The WSDL URL of the SOAP service endpoint (primary or backup).</param>
     * <param name="args" type="Object">The arguments to pass to the GetGeoLocationByIP_V4 method.</param>
     * <returns type="Promise<IPAVResponse>">A promise that resolves to an IPAVResponse object containing the SOAP response data.</returns>
     * <exception cref="Error">Thrown if the SOAP client creation fails, the service call fails, or the response cannot be parsed.</exception>
     */
    _callSoap(wsdlUrl, args) {
        return new Promise((resolve, reject) => {
            soap.createClient(wsdlUrl, { timeout: this.timeoutSeconds * 1000 }, (err, client) => {
                if (err) return reject(err);

                client.GetLocationByIP_V4(args, (err, result) => {
                    const rawData = result?.GetLocationByIP_V4Result;
                    try {
                        if (!rawData) {
                            return reject(new Error("SOAP response is empty or undefined."));
                        }
                        const parsed = new IPAVResponse(rawData);
                        resolve(parsed);
                    } catch (parseErr) {
                        reject(new Error(`Failed to parse SOAP response: ${parseErr.message}`));
                    }
                });
            });
        });
    }

    /**
     * <summary>
     * Checks if a SOAP response is valid by verifying that it exists and either has no Error object
     * or the Error.Number is not equal to '4'.
     * </summary>
     * <param name="response" type="IPAVResponse">The IPAVResponse object to validate.</param>
     * <returns type="boolean">True if the response is valid, false otherwise.</returns>
     */
    _isValid(response) {
        return response && (!response.Error || response.Error.Number !== "4");
    }
}

export { GetGeoLocationByIPV4Soap };