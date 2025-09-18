using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ip_address_validation_dot_net.REST
{
    public class IPAVResponse
    {

        public int Certainty { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public string CountryISO3 { get; set; }
        public string CountryISO2 { get; set; }
        public string PostalCode { get; set; }
        public string MetroCode { get; set; }
        public string DMA { get; set; }
        public string StateFIPS { get; set; }
        public string CountyFIPS { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string IsProxy { get; set; }
        public string ProxyType { get; set; }
        public string PossibleMobileDevice { get; set; }
        public string ISP { get; set; }
        public string NetblockOwner { get; set; }
        public string HostNames { get; set; }
        public string IPNoteCodes { get; set; }
        public string IPNotes { get; set; }
        public string Debug { get; set; }
        public Error Error { get; set; }

        public override string ToString()
        {
            return $"Certainty: {Certainty}\n" +
                   $"City: {City}\n" +
                   $"Region: {Region}\n" +
                   $"Country: {Country}\n" +
                   $"CountryISO3: {CountryISO3}\n" +
                   $"CountryISO2: {CountryISO2}\n" +
                   $"PostalCode: {PostalCode}\n" +
                   $"MetroCode: {MetroCode}\n" +
                   $"DMA: {DMA}\n" +
                   $"StateFIPS: {StateFIPS}\n" +
                   $"CountyFIPS: {CountyFIPS}\n" +
                   $"Latitude: {Latitude}\n" +
                   $"Longitude: {Longitude}\n" +
                   $"IsProxy: {IsProxy}\n" +
                   $"ProxyType: {ProxyType}\n" +
                   $"PossibleMobileDevice: {PossibleMobileDevice}\n" +
                   $"ISP: {ISP}\n" +
                   $"NetblockOwner: {NetblockOwner}\n" +
                   $"HostNames: {HostNames}\n" +
                   $"IPNoteCodes: {IPNoteCodes}\n" +
                   $"IPNotes: {IPNotes}\n" +
                   $"Debug: {Debug}\n" +
                   $"Error: {Error}\n";
        }

    }
    public class CountryLocation
    {
        public string Country { get; set; }
        public string Cntry { get; set; }
        public string Ctry { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string IsPublicProxy { get; set; }
        public Error Error { get; set; }
        public override string ToString()
        {
            return $"Country: {Country}{Environment.NewLine}" +
                   $"Cntry: {Cntry}{Environment.NewLine}" +
                   $"Ctry: {Ctry}{Environment.NewLine}" +
                   $"Longitude: {Longitude}{Environment.NewLine}" +
                   $"Latitude: {Latitude}{Environment.NewLine}" +
                   $"IsPublicProxy: {IsPublicProxy}{Environment.NewLine}" +
                   $"Error: {Error}";
        }
    }
    public class Error
    {
        public string Desc { get; set; }
        public string Number { get; set; }
        public string Location { get; set; }
        public override string ToString()
        {
            return $"Desc: {Desc} " +
                $"Number: {Number} " +
                $"Location: {Location}";
        }
    }

}
