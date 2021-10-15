
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using webAppBillett.Contexts;
using webAppBillett.Models;

namespace webAppBillett.DAL
{


    public interface IAdminRepository
    {

        public Task<List<Person>> hentPersoner();
        public Task<List<Betaling>> hentBetalinger();
        public Task<List<Havn>> hentHavner();
        public  Task<bool> loggInn(Bruker bruker);
        public  Task<List<Reservasjon>> hentReservasjoner();
        public Task<List<Rute>> hentRutere();
        public Task<List<RuteForekomstDatoTid>> hentRuteforekomstdatotider();
        public Task<List<RuteForekomstDato>> hentRuteforekomstdatoer();
        public Task<List<Lugar>> hentLugarer();
        public Task<List<BillettPerson>> hentBillettpersoner();
        public Task<List<Billett>> hentBilletter();
    }
}

