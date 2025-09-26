export class Error {
    constructor(data = {}) {
        this.Desc = data.Desc;
        this.Number = data.Number;
        this.Location = data.Location;
    }

    toString() {
        return `Error: Desc = ${this.Desc}, Number = ${this.Number}, Location = ${this.Location}`;
    }
}

export class IPAVResponse {
    constructor(data = {}) {
        this.IPAddress = data.IPAddress;
        this.LicenseKey = data.LicenseKey;
        this.Certainty = data.Certainty || 0;
        this.City = data.City;
        this.Region = data.Region;
        this.Country = data.Country;
        this.CountryISO3 = data.CountryISO3;
        this.CountryISO2 = data.CountryISO2;
        this.PostalCode = data.PostalCode;
        this.MetroCode = data.MetroCode;
        this.DMA = data.DMA;
        this.StateFIPS = data.StateFIPS;
        this.CountyFIPS = data.CountyFIPS;
        this.Latitude = data.Latitude;
        this.Longitude = data.Longitude;
        this.IsProxy = data.IsProxy;
        this.ProxyType = data.ProxyType;
        this.PossibleMobileDevice = data.PossibleMobileDevice;
        this.ISP = data.ISP;
        this.NetblockOwner = data.NetblockOwner;
        this.HostNames = data.HostNames;
        this.IPNoteCodes = data.IPNoteCodes;
        this.IPNotes = data.IPNotes;
        this.Debug = data.Debug;
        this.Error = data.Error ? new Error(data.Error) : null;
    }

    toString() {
        return `IPAVResponse: IPAddress = ${this.IPAddress ?? 'null'}, LicenseKey = ${this.LicenseKey ?? 'null'}, ` +
               `Certainty = ${this.Certainty}, City = ${this.City ?? 'null'}, Region = ${this.Region ?? 'null'}, ` +
               `Country = ${this.Country ?? 'null'}, CountryISO3 = ${this.CountryISO3 ?? 'null'}, ` +
               `CountryISO2 = ${this.CountryISO2 ?? 'null'}, PostalCode = ${this.PostalCode ?? 'null'}, ` +
               `MetroCode = ${this.MetroCode ?? 'null'}, DMA = ${this.DMA ?? 'null'}, ` +
               `StateFIPS = ${this.StateFIPS ?? 'null'}, CountyFIPS = ${this.CountyFIPS ?? 'null'}, ` +
               `Latitude = ${this.Latitude ?? 'null'}, Longitude = ${this.Longitude ?? 'null'}, ` +
               `IsProxy = ${this.IsProxy ?? 'null'}, ProxyType = ${this.ProxyType ?? 'null'}, ` +
               `PossibleMobileDevice = ${this.PossibleMobileDevice ?? 'null'}, ISP = ${this.ISP ?? 'null'}, ` +
               `NetblockOwner = ${this.NetblockOwner ?? 'null'}, HostNames = ${this.HostNames ?? 'null'}, ` +
               `IPNoteCodes = ${this.IPNoteCodes ?? 'null'}, IPNotes = ${this.IPNotes ?? 'null'}, ` +
               `Debug = ${this.Debug ?? 'null'}, Error = ${this.Error ? this.Error.toString() : 'null'}`;
    }
}

export default IPAVResponse;