using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ZoomIntegration2.Controllers
{
    public class meetingController : Controller
    {
        // GET: meeting
        public ActionResult Index()
        {
            return View();
        }

        // POST: meeting/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

    }
}
