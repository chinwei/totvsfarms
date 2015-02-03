
/* global $,document,console,Parse */
$(document).ready(function() {
  
  var inst = $.remodal.lookup[$('[data-remodal-id=modal]').data('remodal')];
 

  // var parseAPPID = "KtL3tUwbxRKJu05KVpTdtglHFoMRIFMmU11gFiuv";
  // var parseJSID = "PZEACZ9wMCORcVZatTvF5JPYin1GDUf8fYS4nqr3";
  
  var parseAPPID = "xnbnZqfqDnXdTvIPR813AcqF3rjE1QSWL7on9Hbq";
  var parseJSID = "iIWzUXFpzmMukn1JAIcOepOaZ5fkz412Pj0Yd83Q";

  Parse.initialize(parseAPPID, parseJSID);
  var CommentObject = Parse.Object.extend("Totvsfarms");
  
  $("#contact-form").on("submit", function(e) {
    e.preventDefault();

    console.log("Handling the submit");
    //add error handling here
    //gather the form data

    var data = {};
    data.name = $("#name").val();
    data.email = $("#email").val();
    data.comments = $("#comments").val();

    var comment = new CommentObject();
    comment.save(data, {
      success:function() {
        console.log("Success");

        $('#thank-you').addClass('reveal');

        TweenMax.to($('#contact-form'), 0.5, {css: {
          top: '50px',
          opacity: 0
        },
        onComplete: function(){
          setTimeout(function(){
            inst.close();
            $('#thank-you').removeClass('reveal');
            $('#contact-form').css('opacity', '1');
            $('#contact-form input, #contact-form textarea').val('')
          }, 1000)
          
        }
        })
        TweenMax.to($('#thank-you'), 0.7, {css: {
          opacity: 1
        },
        ease:Quad.easeOut
      })

        // run function
        Parse.Cloud.run('hello', { 
              "name": data.name,
              "email": data.email,
              "comments": data.comments
           }, 
           { 
              success: function(result) { 
                 
              }, 
              error: function(error) { 
                 // alert(error.message); 
              } 
           } 
           )
      },
      error:function(e) {
        console.dir(e);
      }
    });
    
  });
  
});




$(document).on('open', '.remodal', function () {
    console.log('open');
});






var wh = $(window).height();

var bylineTop = $('#section-1').height();
var otherFeaturesTop = $('#section-2').height() + bylineTop;
var coopTop = $('#other-features').height() + otherFeaturesTop;


$(window).resize(function(){

  bylineTop = $('#section-1').height();
  otherFeaturesTop = $('#section-2').height() + bylineTop;
  coopTop = $('#other-features').height() + otherFeaturesTop;

})

$(window).scroll(function(e){

  if ($(window).scrollTop()>bylineTop && $(window).scrollTop()<coopTop) {
    // if scroll is in between 1t and last screen, show blue logo
    $('#top-bar').addClass('reveal');

  } else if ($(window).scrollTop()< bylineTop || $(window).scrollTop()> coopTop) {
    // if scroll is in the first screen or last screen, show white logo
    $('#top-bar').removeClass('reveal');

  }


})



