﻿
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

        public Task<bool> loggInn(Bruker bruker);
        public Task<List<Person>> hentPersoner();
        public Task<List<Betaling>> hentBetalinger();
        public Task<List<Havn>> hentHavner();
 
        public  Task<List<Reservasjon>> hentReservasjoner();
        public Task<List<Rute>> hentRutere();
        public Task<List<RuteForekomstDatoTid>> hentRuteforekomstdatotider();
        public Task<List<RuteForekomstDato>> hentRuteforekomstdatoer();
        public Task<List<Lugar>> hentLugarer();
        public Task<List<BillettPerson>> hentBillettpersoner();


        public Task<List<Bruker>> hentBrukere();
        public void lagreBruker(Bruker bruker);
        public void endreBruker(Bruker bruker);
        public void slettBruker(string brukernavn);

        public Task<List<Billett>> hentBilletter();

        public void lagrePerson(Person person);
        public void lagreBetaling(Betaling betaling);
        public void lagreHavn(Havn havn);
        public void lagreReservasjon(Reservasjon reservasjon);
        public void lagreRuter(Rute rute);
        public void lagreRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid);
        public void lagreRuteforekomstdato(RuteForekomstDato ruteForekomstDato);
        public void lagreLugar(Lugar lugar);
        public void lagreBillettperson(BillettPerson billettPerson);
        public void lagreBillett(Billett billett);

        public void endrePerson(Person person);
        public void endreBetaling(Betaling betaling);
        public void endreHavn(Havn havn);
        public void endreReservasjon(Reservasjon reservasjon);
        public void endreRute(Rute rute);
        public void slettRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid);
        public void endreRuteforekomstdato(RuteForekomstDato ruteForekomstDato);
        public void endreLugar(Lugar lugar);
        public void endreBillettperson(BillettPerson billettPerson);
        public void endreBillett(Billett billett);
        public void endreRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid);
        public void slettBillettperson(BillettPerson billettperson);
        public void slettPerson(int id);
        public void slettBetaling(int id);
        public void slettHavn(int id);
        public void slettReservasjon(Reservasjon reservasjon);
        public void slettRute(int id);
        public void slettRuteforekomstdato(int id);
        public void slettLugar(int id);
        public void slettBillett(int id);
    }
}

