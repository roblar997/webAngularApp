﻿using System.ComponentModel.DataAnnotations;

namespace webAppBillett.DAL
{
    public class Bruker
    {
        [Key]
        public string brukernavn {get; set; } 

        public string passord { get; set; }

        public string salt { get; set; }
    }
}