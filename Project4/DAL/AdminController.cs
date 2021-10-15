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

        [HttpPost]
        public void lagrePerson([FromBody] Person person)
        {
            _lugDb.lagrePerson(person);
        }

        [HttpPost]
        public void lagreBetaling([FromBody] Betaling betaling)
        {
            _lugDb.lagreBetaling(betaling);
        }

        [HttpPost]
        public ActionResult lagreHavn([FromBody] Havn havn)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreHavn(havn);
            return Ok();
        }
        [HttpPost]
        public void lagreReservasjon([FromBody] Reservasjon reservasjon)
        {
            _lugDb.lagreReservasjon(reservasjon);
        }
        [HttpPost]
        public void lagreRuter([FromBody] Rute rute)
        {
            _lugDb.lagreRuter(rute);
        }
        [HttpPost]
        public void lagreRuteforekomstdatotid([FromBody] RuteForekomstDatoTid ruteForekomstDatotid)
        {
            _lugDb.lagreRuteforekomstdatotid(ruteForekomstDatotid);
        }

        public void lagreRuteforekomstdato([FromBody] RuteForekomstDato ruteForekomstDato)
        {
            _lugDb.lagreRuteforekomstdato(ruteForekomstDato);
        }
        [HttpPost]
        public void lagreLugar([FromBody] Lugar lugar)
        {
            _lugDb.lagreLugar(lugar);
        }
        [HttpPost]
        public void lagreBillettperson([FromBody] BillettPerson billettPerson)
        {
            _lugDb.lagreBillettperson(billettPerson);
        }
        [HttpPost]
        public void lagreBillett([FromBody] Billett billett)
        {
            _lugDb.lagreBillett(billett);
        }
        [HttpPost]
        public void endrePerson([FromBody] Person person)
        {
            _lugDb.endrePerson(person);
        }
        [HttpPost]
        public void endreBetaling([FromBody] Betaling betaling)
        {
            _lugDb.endreBetaling(betaling);
        }
        [HttpPost]
        public void endreHavn([FromBody] Havn havn)
        {
            _lugDb.endreHavn(havn);
        }
        [HttpPost]
        public void endreReservasjon([FromBody] Reservasjon reservasjon)
        {
            _lugDb.endreReservasjon(reservasjon);
        }
        [HttpPost]
        public void endreRute([FromBody] Rute rute)
        {
            _lugDb.endreRute(rute);
        }
        [HttpPost]
        public void endreRuteforekomstdatotid([FromBody] RuteForekomstDatoTid ruteForekomstDatotid)
        {
            _lugDb.endreRuteforekomstdatotid(ruteForekomstDatotid);
        }
        [HttpPost]
        public void endreRuteforekomstdato([FromBody] RuteForekomstDato ruteForekomstDato)
        {
            _lugDb.endreRuteforekomstdato(ruteForekomstDato);
        }
        [HttpPost]
        public void endreLugar([FromBody] Lugar lugar)
        {
            _lugDb.endreLugar(lugar);
        }
        [HttpPost]
        public void endreBillettperson([FromBody] BillettPerson billettPerson)
        {
            _lugDb.endreBillettperson(billettPerson);
        }
        [HttpPost]
        public void endreBillett([FromBody] Billett billett)
        {
            _lugDb.endreBillett(billett);
        }
        [HttpPost]
        public void slettPerson(int id)
        {
            _lugDb.slettPerson(id);
 
        }
        [HttpPost]
        public void slettBetaling(int id)
        {
            _lugDb.slettBetaling(id);
        }
        [HttpPost]
        public void slettHavn(int id)
        {
            _lugDb.slettHavn(id);
        }
        [HttpPost]
        public void slettReservasjon([FromBody] Reservasjon reservasjon)
        {
            _lugDb.slettReservasjon(reservasjon);
        }
        [HttpPost]
        public void slettRute(int id)
        {
            _lugDb.slettRute(id);
        }
        [HttpPost]
        public void slettRuteforekomstdatotid([FromBody] RuteForekomstDatoTid ruteForekomstDatoTid)
        {
            _lugDb.slettRuteforekomstdatotid(ruteForekomstDatoTid);
        }
        [HttpPost]
        public void slettRuteforekomstdato(int id)
        {
            _lugDb.slettRuteforekomstdato(id);
        }
        [HttpPost]
        public void slettLugar(int id)
        {
            _lugDb.slettLugar(id);
        }
        [HttpPost]
        public void slettBillettperson([FromBody] BillettPerson billettperson)
        {
            _lugDb.slettBillettperson(billettperson);
        }
        [HttpPost]
        public void sletteBillett(int id)
        {
            _lugDb.sletteBillett(id);
        }
    }
}