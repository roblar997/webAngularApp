using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using webAppBillett.Contexts;
using webAppBillett.Models;

namespace webAppBillett.DAL
{

    public class AdminRepository : IAdminRepository
    {
        private readonly BillettContext _lugDb;

        public AdminRepository(BillettContext db)
        {
            _lugDb = db;

        }
        public async Task<List<Person>> hentPersoner()
        {


            return await _lugDb.personer.ToListAsync();

        }
        public async Task<List<Betaling>> hentBetalinger()
        {


            return await _lugDb.betaling.ToListAsync();

        }

        public async Task<List<Billett>> hentBilletter()
        {
            return await _lugDb.billetter.ToListAsync();
        }

        public async Task<List<BillettPerson>> hentBillettpersoner()
        {
            return await _lugDb.billettPerson.ToListAsync();
        }

        public async Task<List<Havn>> hentHavner()
        {
            return await _lugDb.havn.ToListAsync();
        }

        public async Task<List<Lugar>> hentLugarer()
        {
            return await _lugDb.lugarer.ToListAsync();
        }



        public async Task<List<RuteForekomstDato>> hentRuteforekomstdatoer()
        {
            return await _lugDb.ruteForekomstDato.ToListAsync();
        }

        public async Task<List<RuteForekomstDatoTid>> hentRuteforekomstdatotider()
        {
            return await _lugDb.ruteForekomstDatoTid.ToListAsync();
        }
    }

}