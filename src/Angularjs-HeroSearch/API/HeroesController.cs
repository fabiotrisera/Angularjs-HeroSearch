using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Angularjs_HeroSearch.Model;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Angularjs_HeroSearch.API
{
    [Route("api/[controller]")]
    public class HeroesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Hero> Get()
        {
            return new List<Hero>
            {
                new Hero { Id = 1, Name = "Superman", FirstName = "Clark", LastName = "Kent"  },
                new Hero { Id = 2, Name = "Batman", FirstName = "Bruce", LastName = "Wayne"  }
            };
        }
    }
}
