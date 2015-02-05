
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {

/* global Parse,console,require */
var Mailgun = require('mailgun');
Mailgun.initialize('totvsfarms.com', 'key-e3fc55210e753a3e3294bd2a0ac29494');

	Mailgun.sendEmail({
	  // to: "chinwei@totvslabs.com",
	  to: "farms@totvslabs.com",
	  from: request.params.email ,
	  subject: "Email from "+request.params.name+"",
	  text: request.params.comments 
	}, {
	  success: function(httpResponse) {
	    // console.log('httpreponse is '+httpResponse);
	    // response.success('reponse is '+response);
	    // response.success('http reponse is '+httpResponse);
	  },
	  error: function(httpResponse) {
	    console.error(httpResponse);
	    response.error("Uh oh, something went wrong");
	  }
	});


});



