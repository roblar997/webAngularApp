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

        public async Task<bool> erLoggetInn()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return false;
            }
            return true;
        }
        public async Task<ActionResult> hentPersoner()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }

            return Ok(await _lugDb.hentPersoner());

        }
        public async Task<ActionResult> hentBetalinger()
        {

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            return Ok(await _lugDb.hentBetalinger());

        }

        public async Task<ActionResult> hentBrukere()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            return Ok(await _lugDb.hentBrukere());
        }
        [HttpPost]
        public ActionResult slettBruker([FromBody] string brukernavn)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            _log.LogInformation("slettet " + brukernavn);
            _lugDb.slettBruker(brukernavn);
            return Ok();
        }
        [HttpPost]
        public ActionResult lagreBruker([FromBody] Bruker bruker)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            _lugDb.lagreBruker(bruker);
            _log.LogInformation("Lagret " + bruker.ToString());
            return Ok();
        }
        [HttpPost]
        public ActionResult endreBruker([FromBody] Bruker bruker)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            _lugDb.endreBruker(bruker);
            _log.LogInformation("Endret en bruker til " + bruker.ToString());
            return Ok();
        }

        public bool logUt()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                HttpContext.Session.SetString("logginn", "");
                return true;
            }
            return false;
       
        }
        [HttpPost]
        public async Task<ActionResult> loggInn([FromBody] Bruker bruker)
        {
        
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            bool ok = await _lugDb.loggInn(bruker);

            if (!ok)
            {
                HttpContext.Session.SetString("logginn", "");
                return Ok(false);
            }
            HttpContext.Session.SetString("logginn", "erInnlogget");
         
            return Ok(true);
        }
        public async Task<ActionResult> hentRutere()
        {

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
          //  if (string.IsNullOrEmpty(HttpContext.Session.GetString("loggin")))
           // {
           //     return Unauthorized();
          //  }
            return Ok(await _lugDb.hentRutere());

        }

        public async Task<ActionResult> hentBilletter()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            return Ok(await _lugDb.hentBilletter());
        }
        public async Task<ActionResult> hentReservasjoner()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            return Ok(await _lugDb.hentReservasjoner());
        }

        public async Task<ActionResult> hentBillettpersoner()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            return Ok(await _lugDb.hentBillettpersoner());
        }

        public async Task<ActionResult> hentHavner()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            return Ok(await _lugDb.hentHavner());
        }

        public async Task<ActionResult> hentLugarer()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            return Ok(await _lugDb.hentLugarer());
        }



        public async Task<ActionResult> hentRuteforekomstdatoer()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            return Ok(await _lugDb.hentRuteforekomstdatoer());
        }

        public async Task<ActionResult> hentRuteforekomstdatotider()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            return Ok(await _lugDb.hentRuteforekomstdatotider());
        }

        [HttpPost]
        public async Task<ActionResult> lagrePerson([FromBody] Person person)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagrePerson(person);
            _log.LogInformation("Lagret person " + person.ToString());
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> lagreBetaling([FromBody] Betaling betaling)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreBetaling(betaling);
            _log.LogInformation("Lagret betaling " + betaling.ToString());
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> lagreHavn([FromBody] Havn havn)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreHavn(havn);
            _log.LogInformation("Lagret havn " + havn.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreReservasjon([FromBody] Reservasjon reservasjon)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreReservasjon(reservasjon);
            _log.LogInformation("Lagret reservasjon " + reservasjon.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreRuter([FromBody] Rute rute)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreRuter(rute);
            _log.LogInformation("Lagret rute " + rute.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreRuteforekomstdatotid([FromBody] RuteForekomstDatoTid ruteForekomstDatotid)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreRuteforekomstdatotid(ruteForekomstDatotid);
            _log.LogInformation("Lagret ruteForekomstDatotid " + ruteForekomstDatotid.ToString());
            return Ok();
        }

        public async Task<ActionResult> lagreRuteforekomstdato([FromBody] RuteForekomstDato ruteForekomstDato)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreRuteforekomstdato(ruteForekomstDato);
            _log.LogInformation("Lagret ruteForekomstDato " + ruteForekomstDato.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreLugar([FromBody] Lugar lugar)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreLugar(lugar);
            _log.LogInformation("Lagret lugar " + lugar.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreBillettperson([FromBody] BillettPerson billettPerson)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreBillettperson(billettPerson);
            _log.LogInformation("Lagret billettPerson " + billettPerson.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> lagreBillett([FromBody] Billett billett)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.lagreBillett(billett);
            _log.LogInformation("Lagret billett " + billett.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endrePerson([FromBody] Person person)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endrePerson(person);
            _log.LogInformation("Endret en person til " + person.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreBetaling([FromBody] Betaling betaling)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreBetaling(betaling);
            _log.LogInformation("Endret en betaling til " + betaling.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreHavn([FromBody] Havn havn)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreHavn(havn);
            _log.LogInformation("Endret en havn til " + havn.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreReservasjon([FromBody] Reservasjon reservasjon)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreReservasjon(reservasjon);
            _log.LogInformation("Endret en reservasjon til " + reservasjon.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreRute([FromBody] Rute rute)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreRute(rute);
            _log.LogInformation("Endret en rute til " + rute.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreRuteforekomstdatotid([FromBody] RuteForekomstDatoTid ruteForekomstDatotid)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreRuteforekomstdatotid(ruteForekomstDatotid);
            _log.LogInformation("Endret en ruteForekomstDatotid til " + ruteForekomstDatotid.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreRuteforekomstdato([FromBody] RuteForekomstDato ruteForekomstDato)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreRuteforekomstdato(ruteForekomstDato);
            _log.LogInformation("Endret en ruteForekomstDato til " + ruteForekomstDato.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreLugar([FromBody] Lugar lugar)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreLugar(lugar);
            _log.LogInformation("Endret en lugar til " + lugar.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreBillettperson([FromBody] BillettPerson billettPerson)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreBillettperson(billettPerson);
            _log.LogInformation("Endret en billettPerson til " + billettPerson.ToString());
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> endreBillett([FromBody] Billett billett)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.endreBillett(billett);
            _log.LogInformation("Endret en billett til " + billett.ToString());
            return Ok();
        }
        [HttpPost]
        public ActionResult slettPerson([FromBody] int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            _lugDb.slettPerson(id);
            _log.LogInformation("Slettet person med id " + id);
            return Ok();

        }
        [HttpPost]
        public ActionResult slettBetaling([FromBody] int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            _lugDb.slettBetaling(id);
            _log.LogInformation("Slettet betaling med id " + id);
            return Ok();
        }
        [HttpPost]
        public ActionResult slettHavn([FromBody] int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            _lugDb.slettHavn(id);
            _log.LogInformation("Slettet havn med id " + id);
            return Ok();
        }
        [HttpPost]
        public ActionResult  slettReservasjon([FromBody] Reservasjon reservasjon)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.slettReservasjon(reservasjon);
            _log.LogInformation("Slettet reservasjon " + reservasjon.ToString());
            return Ok();
        }
        [HttpPost]
        public ActionResult slettRute([FromBody] int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            _lugDb.slettRute(id);
            _log.LogInformation("Slettet rute med id " + id);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> slettRuteforekomstdatotid([FromBody] RuteForekomstDatoTid ruteForekomstDatoTid)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.slettRuteforekomstdatotid(ruteForekomstDatoTid);
            _log.LogInformation("Slettet ruteForekomstDatoTid " + ruteForekomstDatoTid);
            return Ok();
        }
        [HttpPost]
        public ActionResult slettRuteforekomstdato([FromBody] int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            _lugDb.slettRuteforekomstdato(id);
            _log.LogInformation("Slettet slettRuteforekomstdato med id " + id);
            return Ok();
        }
        [HttpPost]
        public ActionResult slettLugar([FromBody] int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            _lugDb.slettLugar(id);
            _log.LogInformation("Slettet lugar med id " + id);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> slettBillettperson([FromBody] BillettPerson billettperson)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid) return BadRequest("Ugyldig input");
            _lugDb.slettBillettperson(billettperson);
            _log.LogInformation("Slettet billettperson" + billettperson.ToString());
            return Ok();
        }
        [HttpPost]
        public ActionResult slettBillett([FromBody] int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("logginn")))
            {
                return Unauthorized();
            }
            _lugDb.slettBillett(id);
            _log.LogInformation("Slettet billett med id " + id);
            return Ok();
        }
    }
}