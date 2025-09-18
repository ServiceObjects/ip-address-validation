export class Error {
    constructor(data = {}) {
        this.Desc = data.Desc || null;
        this.Number = data.Number || null;
        this.Location = data.Location || null;
    }

    toString() {
        return `Error: Desc = ${this.Desc}, Number = ${this.Number}, Location = ${this.Location}`;
    }
}

export class IPAVResponse {
    constructor(data = {}) {
        this.IPAddress = data.IPAddress || null;
        this.LicenseKey = data.LicenseKey || null;
        this.Certainty = data.Certainty || 0;
        this.City = data.City || null;
        this.Region = data.Region || null;
        this.Country = data.Country || null;
        this.CountryISO3 = data.CountryISO3 || null;
        this.CountryISO2 = data.CountryISO2 || null;
        this.PostalCode = data.PostalCode || null;
        this.MetroCode = data.MetroCode || null;
        this.DMA = data.DMA || null;
        this.StateFIPS = data.StateFIPS || null;
        this.CountyFIPS = data.CountyFIPS || null;
        this.Latitude = data.Latitude || null;
        this.Longitude = data.Longitude || null;
        this.IsProxy = data.IsProxy || null;
        this.ProxyType = data.ProxyType || null;
        this.PossibleMobileDevice = data.PossibleMobileDevice || null;
        this.ISP = data.ISP || null;
        this.NetblockOwner = data.NetblockOwner || null;
        this.HostNames = data.HostNames || null;
        this.IPNoteCodes = data.IPNoteCodes || null;
        this.IPNotes = data.IPNotes || null;
        this.Debug = data.Debug || null;
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