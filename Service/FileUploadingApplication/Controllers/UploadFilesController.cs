using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using FileUploadingApplication.Models;
using Newtonsoft.Json;

namespace FileUploadingApplication.Controllers
{

    public class UploadFilesController : ApiController
    {

        [HttpGet]
        public HttpResponseMessage getall()
        { 
            try
            {
                Details detail = new Details();
                DataTable dt = detail.getAllData();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        public HttpResponseMessage Get(string id)
        {
            try
            {
                Details detail = new Details();
                DataTable dataTable = detail.getRecordById(id);
                return Request.CreateResponse(HttpStatusCode.OK, dataTable);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        public HttpResponseMessage Post()
        {
            Details detail = new Details();
    
            string documentType = HttpContext.Current.Request.Params.Get("documentType");
            string userId = HttpContext.Current.Request.Params.Get("userId").ToString();
            string userRole = HttpContext.Current.Request.Params.Get("userRole");
            string userName= HttpContext.Current.Request.Params.Get("userName");

            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    string finalPath = string.Empty;
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/uploadDocuments/" + postedFile.FileName);
                    if (!File.Exists(filePath))
                    {
                        postedFile.SaveAs(filePath);
                        finalPath = "/uploadDocuments/" + postedFile.FileName;
                    }
                    else
                    {
                        Random rnd = new Random();
                        int randomNumber = rnd.Next(1, 10001);
                        string randomNumberString = randomNumber.ToString();

                        string filePathnew = HttpContext.Current.Server.MapPath("~/uploadDocuments/" + randomNumberString + postedFile.FileName);
                        postedFile.SaveAs(filePathnew);
                        finalPath = "/uploadDocuments/" + randomNumberString + postedFile.FileName;
                    }
                    docfiles.Add("/uploadDocuments/" + postedFile.FileName);
                    docfiles.Add(documentType);
                    detail.postPathToDb(finalPath, documentType, userId, userRole, userName);
                }
                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest); 
            }
            return result;
        }

    }
}
