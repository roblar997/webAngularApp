using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using webAppBillett.Models;
using webAppBillett.DAL;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;

namespace webAppBillett.Controllers
{
    [Route("[Controller]/[action]")]
    public class AdminController : Controller
    {

        private readonly IAdminRepository _lugDb;
        private ILogger<AdminController> _log;

        public AdminController(IAdminRepository db, ILogger<AdminController> log)
        {

            _lugDb = db;
            _log = log;

        }
        public async Task<List<Person>> hentPersoner()
        {


            return await _lugDb.hentPersoner();

        }
        public async Task<List<Betaling>> hentBetalinger()
        {


            return await _lugDb.hentBetalinger();

        }

        public async Task<ActionResult> loggInn(Bruker bruker)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            bool ok = await _lugDb.loggInn(bruker);

            if (!ok)
            {
                return Ok(false);
            }
            return Ok(true);
        }
        public async Task<List<Rute>> hentRutere()
        {


            return await _lugDb.hentRutere();

        }

        public async Task<List<Billett>> hentBilletter()
        {
            return await _lugDb.hentBilletter();
        }
        public async Task<List<Reservasjon>> hentReservasjoner()
        {
            return await _lugDb.hentReservasjoner();
        }

        public async Task<List<BillettPerson>> hentBillettpersoner()
        {
            return await _lugDb.hentBillettpersoner();
        }

        public async Task<List<Havn>> hentHavner()
        {
            return await _lugDb.hentHavner();
        }

        public async Task<List<Lugar>> hentLugarer()
        {
            return await _lugDb.hentLugarer();
        }



        public async Task<List<RuteForekomstDato>> hentRuteforekomstdatoer()
        {
            return await _lugDb.hentRuteforekomstdatoer();
        }

        public async Task<List<RuteForekomstDatoTid>> hentRuteforekomstdatotider()
        {
            return await _lugDb.hentRuteforekomstdatotider();
        }


    }
}