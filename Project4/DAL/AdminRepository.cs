using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using webAppBillett.Contexts;
using webAppBillett.Models;

namespace webAppBillett.DAL
{

    public class AdminRepository : IAdminRepository
    {
        private readonly BillettContext _lugDb;

        public AdminRepository(BillettContext db)
        {
            _lugDb = db;

        }
        public async Task<List<Person>> hentAllePersoner()
        {


            return await _lugDb.personer.ToListAsync();

        }


    }

}