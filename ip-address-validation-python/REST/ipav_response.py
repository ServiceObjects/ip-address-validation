from dataclasses import dataclass
from typing import Optional

@dataclass
class Error:
    Desc: Optional[str] = None
    Number: Optional[str] = None
    Location: Optional[str] = None

    def __str__(self) -> str:
        return (f"Error: Desc={self.Desc}, Number={self.Number}, Location={self.Location}")

@dataclass
class IPAVResponse:
    IPAddress: Optional[str] = None
    LicenseKey: Optional[str] = None
    Certainty: Optional[int] = None
    City: Optional[str] = None
    Region: Optional[str] = None
    Country: Optional[str] = None
    CountryISO3: Optional[str] = None
    CountryISO2: Optional[str] = None
    PostalCode: Optional[str] = None
    MetroCode: Optional[str] = None
    DMA: Optional[str] = None
    StateFIPS: Optional[str] = None
    CountyFIPS: Optional[str] = None
    Latitude: Optional[float] = None
    Longitude: Optional[float] = None
    IsProxy: Optional[str] = None
    ProxyType: Optional[str] = None
    PossibleMobileDevice: Optional[str] = None
    ISP: Optional[str] = None
    NetblockOwner: Optional[str] = None
    HostNames: Optional[str] = None
    IPNoteCodes: Optional[str] = None
    IPNotes: Optional[str] = None
    Debug: Optional[str] = None
    Error: Optional[Error] = None

    def __str__(self) -> str:
        error = str(self.Error) if self.Error else "None"
        return (f"IPAVResponse: IPAddress={self.IPAddress}, LicenseKey={self.LicenseKey}, "
                f"Certainty={self.Certainty}, City={self.City}, Region={self.Region}, "
                f"Country={self.Country}, CountryISO3={self.CountryISO3}, CountryISO2={self.CountryISO2}, "
                f"PostalCode={self.PostalCode}, MetroCode={self.MetroCode}, DMA={self.DMA}, "
                f"StateFIPS={self.StateFIPS}, CountyFIPS={self.CountyFIPS}, Latitude={self.Latitude}, "
                f"Longitude={self.Longitude}, IsProxy={self.IsProxy}, ProxyType={self.ProxyType}, "
                f"PossibleMobileDevice={self.PossibleMobileDevice}, ISP={self.ISP}, "
                f"NetblockOwner={self.NetblockOwner}, HostNames={self.HostNames}, "
                f"IPNoteCodes={self.IPNoteCodes}, IPNotes={self.IPNotes}, Debug={self.Debug}, "
                f"Error={error}")

