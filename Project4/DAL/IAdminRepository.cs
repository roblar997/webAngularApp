
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

        public Task<List<Person>> hentAllePersoner();


    }
}

