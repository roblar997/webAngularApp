﻿using Microsoft.EntityFrameworkCore;
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


        public async Task<bool> loggInn(Bruker bruker)
        {
            try
            {
                Bruker brukeren = await _lugDb.brukere.FirstOrDefaultAsync(x => x.brukernavn == bruker.brukernavn);

                byte[] hash = lagHash(bruker.passord, Convert.FromBase64String(brukeren.salt));
                bool ok = hash.SequenceEqual(Convert.FromBase64String(brukeren.passord));
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
            Person personen = new Person();
            personen.fornavn = person.fornavn;
            personen.etternavn = person.etternavn;
            personen.telefon = person.telefon;
            _lugDb.personer.Add(personen);
            _lugDb.SaveChanges();

        }

        public void lagreBetaling(Betaling betaling)
        {
            Betaling betalingen = new Betaling();
            betalingen.pris = betaling.pris;
            betalingen.adresse = betaling.adresse;
            betalingen.csv = betaling.csv;
            betalingen.email = betaling.email;
            betalingen.kortholderNavn = betaling.kortholderNavn;
            betalingen.kortnummer = betaling.kortnummer;
            betalingen.postnr = betaling.kortnummer;
            betalingen.poststed = betaling.poststed;
            betalingen.telefon = betaling.telefon;
            betalingen.utloper = betaling.utloper;
            _lugDb.betaling.Add(betalingen);
            _lugDb.SaveChanges();
        }

        public void lagreHavn(Havn havn)
        {
            Havn havnen = new Havn();
            havnen.navn = havn.navn;
            havnen.ruteFra = havn.ruteFra;
            havnen.ruteTil = havn.ruteTil;
            _lugDb.havn.Add(havnen);
            _lugDb.SaveChanges();

        }

        public void lagreReservasjon(Reservasjon reservasjon)
        {
            Reservasjon reservasjonen = new Reservasjon();
            reservasjonen.avgangsDato = reservasjon.avgangsDato;
            reservasjonen.avgangsTid = reservasjon.avgangsTid;
            reservasjonen.ruteId = reservasjon.ruteId;
            _lugDb.reservasjon.Add(reservasjon);
            _lugDb.SaveChanges();
        }

        public void lagreRuter(Rute rute)
        {
            Rute ruten = new Rute();
            ruten.fra = rute.fra;
            ruten.til = rute.til;
            ruten.prisBarn = rute.prisBarn;
            ruten.prisVoksen = rute.prisVoksen;
            ruten.ruteId = rute.ruteId;
            _lugDb.ruter.Add(ruten);
            _lugDb.SaveChanges();
        }

        public void lagreRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid)
        {
            RuteForekomstDatoTid ruteforekomstdatotiden = new RuteForekomstDatoTid();

            ruteforekomstdatotiden.ruteId = ruteForekomstDatotid.ruteId;
            ruteforekomstdatotiden.ankomstDato = ruteForekomstDatotid.ankomstDato;
            ruteforekomstdatotiden.ankomstTid = ruteForekomstDatotid.ankomstTid;
            ruteforekomstdatotiden.avgangsDato = ruteForekomstDatotid.avgangsDato;
            ruteforekomstdatotiden.avgangsTid = ruteForekomstDatotid.avgangsTid;
            ruteforekomstdatotiden.erUtsolgt = ruteForekomstDatotid.erUtsolgt;
            _lugDb.ruteForekomstDatoTid.Add(ruteforekomstdatotiden);
            _lugDb.SaveChanges();

        }

        public void lagreRuteforekomstdato(RuteForekomstDato ruteForekomstDato)
        {
            RuteForekomstDato ruteforekomstdatoen = new RuteForekomstDato();
            ruteforekomstdatoen.ruteId = ruteForekomstDato.ruteId;
            ruteforekomstdatoen.avgangsDato = ruteForekomstDato.avgangsDato;
            ruteforekomstdatoen.erUtsolgt = ruteForekomstDato.erUtsolgt;
            _lugDb.ruteForekomstDato.Add(ruteforekomstdatoen);
            _lugDb.SaveChanges();

        }

        public void lagreLugar(Lugar lugar)
        {
            Lugar lugaren = new Lugar();
            lugaren.antall = lugar.antall;
            lugaren.pris = lugar.pris;
            lugaren.beskrivelse = lugar.beskrivelse;
            lugaren.bildeURL = lugar.bildeURL;
            lugaren.harDysj = lugar.harDysj;
            lugaren.harWc = lugar.harWc;
            lugaren.harWifi = lugar.harWifi;
            lugaren.romNr = lugar.romNr;
            lugaren.tittel = lugar.tittel;
            lugaren.lugarType = lugar.lugarType;
            _lugDb.lugarer.Add(lugaren);
            _lugDb.SaveChanges();

        }

        public void lagreBillettperson(BillettPerson billettPerson)
        {
            _lugDb.billettPerson.Add(billettPerson);
            _lugDb.SaveChanges();
            return;
        }

        public void lagreBillett(Billett billett)
        {
            Billett billetten = new Billett();
            billetten.antBarn = billett.antBarn;
            billetten.antVoksen = billett.antVoksen;
            billetten.avgangsDato = billett.avgangsDato;
            billetten.avgangsTid = billett.avgangsTid;
            billetten.fra = billett.fra;
            billetten.til = billett.til;
            billetten.pris = billett.pris;
            _lugDb.billetter.Add(billetten);
            _lugDb.SaveChanges();
        }


        public void endrePerson(Person person)
        {
            Person personen = _lugDb.personer.Find(person.personId);
            personen.fornavn = person.fornavn;
            personen.etternavn = person.etternavn;
            personen.telefon = person.telefon;
            _lugDb.SaveChanges();

        }

        public void endreBetaling(Betaling betaling)
        {
            Betaling betalingen = _lugDb.betaling.Find(betaling.betalingsId);
            betalingen.pris = betaling.pris;
            betalingen.adresse = betaling.adresse;
            betalingen.csv = betaling.csv;
            betalingen.email = betaling.email;
            betalingen.kortholderNavn = betaling.kortholderNavn;
            betalingen.kortnummer = betaling.kortnummer;
            betalingen.postnr = betaling.kortnummer;
            betalingen.poststed = betaling.poststed;
            betalingen.telefon = betaling.telefon;
            betalingen.utloper = betaling.utloper;
            _lugDb.SaveChanges();
        }

        public void endreHavn(Havn havn)
        {
            Havn havnen = _lugDb.havn.Find(havn.havnId);
            havnen.navn = havn.navn;
            havnen.ruteFra = havn.ruteFra;
            havnen.ruteTil = havn.ruteTil;
            _lugDb.SaveChanges();

        }

        public void endreReservasjon(Reservasjon reservasjon)
        {
            Reservasjon reservasjonen = _lugDb.reservasjon.First((x) => x.billettId == reservasjon.billettId && x.lugarId == reservasjon.lugarId);
            reservasjonen.avgangsDato = reservasjon.avgangsDato;
            reservasjonen.avgangsTid = reservasjon.avgangsTid;
            reservasjonen.ruteId = reservasjon.ruteId;
            _lugDb.SaveChanges();
        }

        public void endreRute(Rute rute)
        {
            Rute ruten = _lugDb.ruter.Find(rute.ruteId);
            ruten.fra = rute.fra;
            ruten.til = rute.til;
            ruten.prisBarn = rute.prisBarn;
            ruten.prisVoksen = rute.prisVoksen;
            ruten.ruteId = rute.ruteId;
            _lugDb.SaveChanges();
        }

        public void endreRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid)
        {
            RuteForekomstDatoTid ruteforekomstdatotiden = _lugDb.ruteForekomstDatoTid.First((x) => x.ruteId == ruteForekomstDatotid.ruteId && x.avgangsDato == ruteForekomstDatotid.avgangsDato && x.avgangsTid == ruteForekomstDatotid.avgangsTid);

            ruteforekomstdatotiden.ruteId = ruteForekomstDatotid.ruteId;
            ruteforekomstdatotiden.ankomstDato = ruteForekomstDatotid.ankomstDato;
            ruteforekomstdatotiden.ankomstTid = ruteForekomstDatotid.ankomstTid;
            ruteforekomstdatotiden.avgangsDato = ruteForekomstDatotid.avgangsDato;
            ruteforekomstdatotiden.avgangsTid = ruteForekomstDatotid.avgangsTid;
            ruteforekomstdatotiden.erUtsolgt = ruteForekomstDatotid.erUtsolgt;
            _lugDb.SaveChanges();

        }

        public void endreRuteforekomstdato(RuteForekomstDato ruteForekomstDato)
        {
            RuteForekomstDato ruteforekomstdatoen = _lugDb.ruteForekomstDato.Find(ruteForekomstDato.forekomstDatoId);
            ruteforekomstdatoen.ruteId = ruteForekomstDato.ruteId;
            ruteforekomstdatoen.avgangsDato = ruteForekomstDato.avgangsDato;
            ruteforekomstdatoen.erUtsolgt = ruteForekomstDato.erUtsolgt;
            _lugDb.SaveChanges();

        }

        public void endreLugar(Lugar lugar)
        {
            Lugar lugaren = _lugDb.lugarer.Find(lugar.lugarId);
            lugaren.antall = lugar.antall;
            lugaren.pris = lugar.pris;
            lugaren.beskrivelse = lugar.beskrivelse;
            lugaren.bildeURL = lugar.bildeURL;
            lugaren.harDysj = lugar.harDysj;
            lugaren.harWc = lugar.harWc;
            lugaren.harWifi = lugar.harWifi;
            lugaren.romNr = lugar.romNr;
            lugaren.tittel = lugar.tittel;
            lugaren.lugarType = lugar.lugarType;
            _lugDb.SaveChanges();

        }

        public void endreBillettperson(BillettPerson billettPerson)
        {
            //Kan ikke endres.
            BillettPerson billettperson = _lugDb.billettPerson.First((x) => x.billettId == billettPerson.billettId && x.personId == billettPerson.personId);
            return;
        }

        public void endreBillett(Billett billett)
        {
            Billett billetten = _lugDb.billetter.Find(billett.billettId);
            billetten.antBarn = billett.antBarn;
            billetten.antVoksen = billett.antVoksen;
            billetten.avgangsDato = billett.avgangsDato;
            billetten.avgangsTid = billett.avgangsTid;
            billetten.fra = billett.fra;
            billetten.til = billett.til;
            billetten.pris = billett.pris;
            _lugDb.SaveChanges();
        }






        public void slettPerson(int id)
        {
            Person person = _lugDb.personer.Find(id);
            _lugDb.personer.Remove(person);
            _lugDb.SaveChanges();
        }

        public void slettBetaling(int id)
        {
            Betaling betaling = _lugDb.betaling.Find(id);
            _lugDb.betaling.Remove(betaling);
            _lugDb.SaveChanges();

        }

        public void slettHavn(int id)
        {
            Havn havn = _lugDb.havn.Find(id);
            _lugDb.havn.Remove(havn);
            _lugDb.SaveChanges();
        }

        public void slettReservasjon(Reservasjon reservasjon)
        {

            Reservasjon reservasjonenen = _lugDb.reservasjon.First((x) => x.billettId == reservasjon.billettId && x.lugarId == reservasjon.lugarId);
            _lugDb.reservasjon.Remove(reservasjonenen);
            _lugDb.SaveChanges();
        }

        public void slettRute(int id)
        {
            Rute rute = _lugDb.ruter.Find(id);
            _lugDb.ruter.Remove(rute);
            _lugDb.SaveChanges();
        }

        public void slettRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid)
        {
            RuteForekomstDatoTid ruteforekomstdatotiden = _lugDb.ruteForekomstDatoTid.First((x) => x.ruteId == ruteForekomstDatotid.ruteId && x.avgangsDato == ruteForekomstDatotid.avgangsDato && x.avgangsTid == ruteForekomstDatotid.avgangsTid);
            _lugDb.ruteForekomstDatoTid.Remove(ruteforekomstdatotiden);
            _lugDb.SaveChanges();
        }

        public void slettRuteforekomstdato(int id)
        {
            RuteForekomstDato ruteForekomstDato = _lugDb.ruteForekomstDato.Find(id);
            _lugDb.ruteForekomstDato.Remove(ruteForekomstDato);
            _lugDb.SaveChanges();
        }

        public void slettLugar(int id)
        {
            Lugar lugar = _lugDb.lugarer.Find(id);
            _lugDb.lugarer.Remove(lugar);
            _lugDb.SaveChanges();
        }

        public void slettBillettperson(BillettPerson billettperson)
        {
            BillettPerson billettpersonen = _lugDb.billettPerson.First((x) => x.billettId == billettperson.billettId && x.personId == billettperson.personId);
            _lugDb.billettPerson.Remove(billettpersonen);
            _lugDb.SaveChanges();
        }

        public void slettBillett(int id)
        {
            Billett billett = _lugDb.billetter.Find(id);
            _lugDb.billetter.Remove(billett);
            _lugDb.SaveChanges();
        }

        public async Task<List<Bruker>> hentBrukere()
        {
            return await _lugDb.brukere.ToListAsync();
        }

        public void lagreBruker(Bruker bruker)
        {
            Bruker brukeren = new Bruker();
            byte[] salt = lagSalt();
            byte[] hash = lagHash(bruker.passord, salt);
            brukeren.brukernavn = bruker.brukernavn;
            brukeren.passord = Convert.ToBase64String(hash);
            brukeren.salt = Convert.ToBase64String(salt);
            _lugDb.Add(brukeren);
            _lugDb.SaveChanges();
        }

        public void endreBruker(Bruker bruker)
        {
            Bruker brukeren = _lugDb.brukere.First((x) => x.brukernavn == bruker.brukernavn);
            brukeren.brukernavn = bruker.brukernavn;
            brukeren.passord = bruker.passord;
            brukeren.salt = bruker.salt;
            _lugDb.Add(bruker);
            _lugDb.SaveChanges();
        }

        public void slettBruker(string brukernavn)
        {
            {
                Bruker brukeren = _lugDb.brukere.First((x) => x.brukernavn == brukernavn);
                _lugDb.brukere.Remove(brukeren);
                _lugDb.SaveChanges();
            }
        }
    }
}