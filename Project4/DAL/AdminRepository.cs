using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using webAppBillett.Contexts;
using webAppBillett.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace webAppBillett.DAL
{

    public class AdminRepository : IAdminRepository
    {
        private readonly BillettContext _lugDb;

        public AdminRepository(BillettContext db)
        {
            _lugDb = db;

        }

        public static byte[] lagHash(string passord, byte[] salt)
        {
            return KeyDerivation.Pbkdf2(
                                password: passord,
                                salt: salt,
                                prf: KeyDerivationPrf.HMACSHA512,
                                iterationCount: 1000,
                                numBytesRequested: 32);
        }

        public static byte[] lagSalt()
        {
            var csp = new RNGCryptoServiceProvider();
            var salt = new byte[24];
            csp.GetBytes(salt);
            return salt;
        }

        public async void registrerBruker(Bruker bruker)
        {
            byte[] salt = lagSalt();
            byte[] hash = lagHash(bruker.passord, salt);
            bruker.passord = Encoding.Default.GetString(hash);
            bruker.salt = salt;
            _lugDb.Add(bruker);
            _lugDb.SaveChanges();
        }

        public async Task<bool> loggInn(Bruker bruker)
        {
            try
            {
                Bruker brukeren = await _lugDb.brukere.FirstOrDefaultAsync(x =>x.brukernavn == bruker.brukernavn);
  
                byte[] hash = lagHash(bruker.passord, brukeren.salt);
                bool ok = hash.SequenceEqual(Encoding.ASCII.GetBytes(brukeren.passord));
                if (ok)
                {
    
                    return true;
                }

                return false;
            }
            catch (Exception e)
            {
    
                return false;
            }
        }
        public async Task<List<Person>> hentPersoner()
        {


            return await _lugDb.personer.ToListAsync();

        }
        public async Task<List<Betaling>> hentBetalinger()
        {


            return await _lugDb.betaling.ToListAsync();

        }
        public async Task<List<Reservasjon>> hentReservasjoner()
        {
            return await _lugDb.reservasjon.ToListAsync();
        }

        public async Task<List<Rute>> hentRutere()
        {


            return await _lugDb.ruter.ToListAsync();

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

        public void lagrePerson(Person person)
        {
            throw new NotImplementedException();
        }

        public void lagreBetaling(Betaling betaling)
        {
            throw new NotImplementedException();
        }

        public void lagreHavn(Havn havn)
        {
            throw new NotImplementedException();
        }

        public void lagreReservasjon(Reservasjon reservasjon)
        {
            throw new NotImplementedException();
        }

        public void lagreRuter(Rute rute)
        {
            throw new NotImplementedException();
        }

        public void lagreRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid)
        {
            throw new NotImplementedException();
        }

        public void lagreRuteforekomstdato(RuteForekomstDato ruteForekomstDato)
        {
            throw new NotImplementedException();
        }

        public void lagreLugar(Lugar lugar)
        {
            throw new NotImplementedException();
        }

        public void lagreBillettperson(BillettPerson billettPerson)
        {
            throw new NotImplementedException();
        }

        public void lagreBillett(Billett billett)
        {
            throw new NotImplementedException();
        }

        public void endrePerson(Person person)
        {
            throw new NotImplementedException();
        }

        public void endreBetaling(Betaling betaling)
        {
            throw new NotImplementedException();
        }

        public void endreHavn(Havn havn)
        {
            throw new NotImplementedException();
        }

        public void endreReservasjon(Reservasjon reservasjon)
        {
            throw new NotImplementedException();
        }

        public void endreRute(Rute rute)
        {
            throw new NotImplementedException();
        }

        public void endreRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid)
        {
            throw new NotImplementedException();
        }

        public void endreRuteforekomstdato(RuteForekomstDato ruteForekomstDato)
        {
            throw new NotImplementedException();
        }

        public void endreLugar(Lugar lugar)
        {
            throw new NotImplementedException();
        }

        public void endreBillettperson(BillettPerson billettPerson)
        {
            throw new NotImplementedException();
        }

        public void endreBillett(Billett billett)
        {
            throw new NotImplementedException();
        }
    }

}