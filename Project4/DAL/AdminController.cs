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

        public async Task<List<Person>> hentAllePersoner()
        {


            return await _lugDb.hentAllePersoner();

        }


    }
}