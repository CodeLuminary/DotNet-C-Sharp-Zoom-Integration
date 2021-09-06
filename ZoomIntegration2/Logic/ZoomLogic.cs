using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Newtonsoft.Json;
using ZoomIntegration2.Models;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using RestSharp;

namespace ZoomIntegration2.Logic
{
    public class ZoomLogic
    {
        public static long ToTimestamp(DateTime value)
        {
            long epoch = (value.Ticks - 621355968000000000) / 10000;
            return epoch;
        }
        public static string ZoomToken()
        {
            // Token will be good for 20 minutes
            DateTime Expiry = DateTime.UtcNow.AddMinutes(20);

            string ApiKey = "Your api key here";
            string ApiSecret = "Your api secret key here";

            int ts = (int)(Expiry - new DateTime(1970, 1, 1)).TotalSeconds;

            // Create Security key  using private key above:
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes(ApiSecret));

            // length should be >256b
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //Finally create a Token
            var header = new JwtHeader(credentials);

            //Zoom Required Payload
            var payload = new JwtPayload
        {
            { "iss", ApiKey},
            { "exp", ts },
        };

            var secToken = new JwtSecurityToken(header, payload);
            var handler = new JwtSecurityTokenHandler();

            // Token to String so you can use it in your client
            var tokenString = handler.WriteToken(secToken);

            return tokenString;
        }
        public static string createOlineClass(string postData)
        {
            ZoomModel zoomModel = JsonConvert.DeserializeObject<ZoomModel>(postData);
            string start_time = zoomModel.start_time.Replace(" ", "T") + ":00Z";
            var obj = @"{
          ""topic"": """ + @zoomModel.topic + @""",
          ""type"": 2,
          ""start_time"":""" + start_time + @""",
          ""duration"": " + zoomModel.duration + @",
          ""password"": ""RICH12345"",
          ""agenda"": ""CLASS LESSON"",
          ""settings"": {
                        ""host_video"": " + zoomModel.hostvideo + @",
            ""participant_video"": " + zoomModel.parvideo + @",
            ""cn_meeting"": false,
            ""in_meeting"": false,
            ""join_before_host"": " + zoomModel.allowstud + @",
            ""mute_upon_entry"": " + zoomModel.muteStud + @",
            ""watermark"": false,
            ""use_pmi"": true,
            ""approval_type"": 2,
            ""registration_type"": 1,
            ""audio"": ""both"",
            ""auto_recording"": ""none"",
    
            ""registrants_email_notification"": true
          }
        }";

            ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;

            DateTime ti = DateTime.ParseExact("2020-10-02 07:00", "yyyy-MM-dd HH:mm", null);
            String ts = (ToTimestamp(DateTime.UtcNow.ToUniversalTime()) - 30000).ToString();

            var tokenString = ZoomToken();

            var client = new RestClient("https://api.zoom.us/v2/users/me/meetings");
            var request = new RestRequest(Method.POST);

            request.AddHeader("content-type", "application/json");
            request.AddHeader("authorization", String.Format("Bearer {0}", tokenString));
            request.AddParameter("application/json", obj, ParameterType.RequestBody);

            var respon = client.Execute(request);
            /* string res2 = respon.Content.Split('?')[0];
             string[] resArr = res2.Split('/');
             if (respon.IsSuccessful)
             {
                 return "1]" + resArr[resArr.Length - 1];
             }
             else
             {
                 return "0] ";
             }*/
            return respon.Content;
        }
    }
}