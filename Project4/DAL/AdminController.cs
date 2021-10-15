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

        public async Task<ActionResult> registrerBruker(Bruker bruker)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");

            _lugDb.registrerBruker(bruker);
            return Ok();
        }
        public async Task<ActionResult> loggInn(Bruker bruker)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            bool ok = await _lugDb.loggInn(bruker);

            if (!ok)
            {
                HttpContext.Session.SetString("loggin", "");
                return Ok(false);
            }
            HttpContext.Session.SetString("loggin", "erInnlogget");
         
            return Ok(true);
        }
        public async Task<ActionResult> hentRutere()
        {

          //  if (string.IsNullOrEmpty(HttpContext.Session.GetString("loggin")))
           // {
           //     return Unauthorized();
          //  }
            return Ok(await _lugDb.hentRutere());

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

        public void lagrePerson(Person person)
        {
            _lugDb.lagrePerson(person);
        }

        public void lagreBetaling(Betaling betaling)
        {
            _lugDb.lagreBetaling(betaling);
        }

        public ActionResult lagreHavn(Havn havn)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreHavn(havn);
            return Ok();
        }

        public void lagreReservasjon(Reservasjon reservasjon)
        {
            _lugDb.lagreReservasjon(reservasjon);
        }

        public void lagreRuter(Rute rute)
        {
            _lugDb.lagreRuter(rute);
        }

        public void lagreRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid)
        {
            _lugDb.lagreRuteforekomstdatotid(ruteForekomstDatotid);
        }

        public void lagreRuteforekomstdato(RuteForekomstDato ruteForekomstDato)
        {
            _lugDb.lagreRuteforekomstdato(ruteForekomstDato);
        }

        public void lagreLugar(Lugar lugar)
        {
            _lugDb.lagreLugar(lugar);
        }

        public void lagreBillettperson(BillettPerson billettPerson)
        {
            _lugDb.lagreBillettperson(billettPerson);
        }

        public void lagreBillett(Billett billett)
        {
            _lugDb.lagreBillett(billett);
        }

        public void endrePerson(Person person)
        {
            _lugDb.endrePerson(person);
        }

        public void endreBetaling(Betaling betaling)
        {
            _lugDb.endreBetaling(betaling);
        }

        public void endreHavn(Havn havn)
        {
            _lugDb.endreHavn(havn);
        }

        public void endreReservasjon(Reservasjon reservasjon)
        {
            _lugDb.endreReservasjon(reservasjon);
        }

        public void endreRute(Rute rute)
        {
            _lugDb.endreRute(rute);
        }

        public void endreRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid)
        {
            _lugDb.endreRuteforekomstdatotid(ruteForekomstDatotid);
        }

        public void endreRuteforekomstdato(RuteForekomstDato ruteForekomstDato)
        {
            _lugDb.endreRuteforekomstdato(ruteForekomstDato);
        }

        public void endreLugar(Lugar lugar)
        {
            _lugDb.endreLugar(lugar);
        }

        public void endreBillettperson(BillettPerson billettPerson)
        {
            _lugDb.endreBillettperson(billettPerson);
        }

        public void endreBillett(Billett billett)
        {
            _lugDb.endreBillett(billett);
        }

        public void slettPerson(int id)
        {
            _lugDb.slettPerson(id);
 
        }

        public void slettBetaling(int id)
        {
            _lugDb.slettBetaling(id);
        }

        public void slettHavn(int id)
        {
            _lugDb.slettHavn(id);
        }

        public void slettReservasjon(Reservasjon reservasjon)
        {
            _lugDb.slettReservasjon(reservasjon);
        }

        public void slettRute(int id)
        {
            _lugDb.slettRute(id);
        }

        public void slettRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatoTid)
        {
            _lugDb.slettRuteforekomstdatotid(ruteForekomstDatoTid);
        }

        public void slettRuteforekomstdato(int id)
        {
            _lugDb.slettRuteforekomstdato(id);
        }

        public void slettLugar(int id)
        {
            _lugDb.slettLugar(id);
        }

        public void slettBillettperson(BillettPerson billettperson)
        {
            _lugDb.slettBillettperson(billettperson);
        }

        public void sletteBillett(int id)
        {
            _lugDb.sletteBillett(id);
        }
    }
}