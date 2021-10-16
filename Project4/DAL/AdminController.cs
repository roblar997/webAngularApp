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

        public async Task<List<Bruker>> hentBrukere()
        {
            return await _lugDb.hentBrukere();
        }
        [HttpPost]
        public void slettBruker([FromBody] string brukernavn)
        {
             _lugDb.slettBruker(brukernavn);
        }
        [HttpPost]
        public void lagreBruker([FromBody] Bruker bruker)
        {
            _lugDb.lagreBruker(bruker);
        }
        [HttpPost]
        public void endreBruker([FromBody] Bruker bruker)
        {
            _lugDb.endreBruker(bruker);
        }
        [HttpPost]
        public async Task<ActionResult> loggInn([FromBody] Bruker bruker)
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
        public async Task<ActionResult> lagrePerson([FromBody] Person person)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagrePerson(person);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> lagreBetaling([FromBody] Betaling betaling)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreBetaling(betaling);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> lagreHavn([FromBody] Havn havn)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreHavn(havn);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreReservasjon([FromBody] Reservasjon reservasjon)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreReservasjon(reservasjon);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreRuter([FromBody] Rute rute)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreRuter(rute);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreRuteforekomstdatotid([FromBody] RuteForekomstDatoTid ruteForekomstDatotid)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreRuteforekomstdatotid(ruteForekomstDatotid);
            return Ok();
        }

        public async Task<ActionResult> lagreRuteforekomstdato([FromBody] RuteForekomstDato ruteForekomstDato)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreRuteforekomstdato(ruteForekomstDato);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreLugar([FromBody] Lugar lugar)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreLugar(lugar);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreBillettperson([FromBody] BillettPerson billettPerson)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreBillettperson(billettPerson);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreBillett([FromBody] Billett billett)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreBillett(billett);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endrePerson([FromBody] Person person)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endrePerson(person);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreBetaling([FromBody] Betaling betaling)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreBetaling(betaling);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreHavn([FromBody] Havn havn)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreHavn(havn);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreReservasjon([FromBody] Reservasjon reservasjon)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreReservasjon(reservasjon);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreRute([FromBody] Rute rute)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreRute(rute);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreRuteforekomstdatotid([FromBody] RuteForekomstDatoTid ruteForekomstDatotid)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreRuteforekomstdatotid(ruteForekomstDatotid);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreRuteforekomstdato([FromBody] RuteForekomstDato ruteForekomstDato)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreRuteforekomstdato(ruteForekomstDato);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreLugar([FromBody] Lugar lugar)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreLugar(lugar);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreBillettperson([FromBody] BillettPerson billettPerson)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreBillettperson(billettPerson);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreBillett([FromBody] Billett billett)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreBillett(billett);
            return Ok();
        }
        [HttpPost]
        public void slettPerson([FromBody] int id)
        {
            _lugDb.slettPerson(id);
 
        }
        [HttpPost]
        public void slettBetaling([FromBody] int id)
        {
            _lugDb.slettBetaling(id);
        }
        [HttpPost]
        public void slettHavn([FromBody] int id)
        {
            _lugDb.slettHavn(id);
        }
        [HttpPost]
        public async Task<ActionResult> slettReservasjon([FromBody] Reservasjon reservasjon)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.slettReservasjon(reservasjon);
            return Ok();
        }
        [HttpPost]
        public void slettRute([FromBody] int id)
        {
            _lugDb.slettRute(id);
        }
        [HttpPost]
        public async Task<ActionResult> slettRuteforekomstdatotid([FromBody] RuteForekomstDatoTid ruteForekomstDatoTid)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.slettRuteforekomstdatotid(ruteForekomstDatoTid);
            return Ok();
        }
        [HttpPost]
        public void slettRuteforekomstdato([FromBody] int id)
        {
            _lugDb.slettRuteforekomstdato(id);
        }
        [HttpPost]
        public void slettLugar([FromBody] int id)
        {
            _lugDb.slettLugar(id);
        }
        [HttpPost]
        public async Task<ActionResult> slettBillettperson([FromBody] BillettPerson billettperson)
        {
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.slettBillettperson(billettperson);
            return Ok();
        }
        [HttpPost]
        public void slettBillett([FromBody] int id)
        {
            _lugDb.slettBillett(id);
        }
    }
}