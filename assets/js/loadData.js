var ajax_url = "https://devshare.noesis.tech/getFrontendSettings";
var customerid = "";
var channelid = "";
var json = null;

// const logFileText = async file => {
//   return await fetch(file);
// };
// var user_resp = $.parseJSON(existingData.user_resp);
$(document).ready(function() {
  //   $.getJSON("./assets/js/feedback.json", resp => {
  // fetch("./assets/json/landing.json")
  //   .then(promise => promise.json())
  //   .then(json => {
      getDynamicData();
      json.feedbackSection.forEach(el => {
        var verificationNotes = '';
        var notesFromServer = "Needs rework \r\n  Needs improvements \r\n  At par with expectations \r\n   Exceeds expectation \r\n   Best in class";

        if (notesFromServer != '') {
            var certNotesArr = notesFromServer.split('\r\n');
            verificationNotes += '<ul>';
                $.each(certNotesArr, function (i, certNote) {
                      verificationNotes += "<li>" + $.trim(certNote) + "</li>";
            });
            verificationNotes += '</ul>';                   
        }

        var feedback = document.createElement("div");
        feedback.className = "sk-feedback";
        if (el.divisor || el.infoIconRequired) {
          var feedCount_dom =
            `<div>` +
            el.feedbackCount  +
            `<span class="divisor">/` +
            el.divisor +
            `</span>
            </div><h5 class="sk-feedback-heading"><span>
            <img src="./assets/images/info-black.svg" alt="Information"
            data-toggle="popover" data-trigger="hover" data-content="`+ verificationNotes +`" data-placement="bottom" data-html="true"/></span>` +
            el.feedbackHeading +
            `</h5>`;
          feedback.innerHTML = feedCount_dom;
          $(feedback).appendTo(
            "#sk-dynamic-feedback, #sk-dynamic-feedback-mobile"
          );
            
        } else {
          var feedCount_dom =
            `<div>` +
            el.feedbackCount +
            `</div><h5 class="sk-feedback-heading">` +
            el.feedbackHeading +
            `</h5>`;
          feedback.innerHTML = feedCount_dom;
          $(feedback).appendTo(
            "#sk-dynamic-feedback, #sk-dynamic-feedback-mobile"
          );
        }
      });

      json.indicesSection.forEach(el => {

        var verificationNotes = '';
        var notesFromServer = "Needs rework \r\n  Needs improvements \r\n  At par with expectations \r\n   Exceeds expectation \r\n   Best in class";

        if (notesFromServer != '') {
            var certNotesArr = notesFromServer.split('\r\n');
            verificationNotes += '<ul>';
                $.each(certNotesArr, function (i, certNote) {
                      verificationNotes += "<li>" + $.trim(certNote) + "</li>";
            });
            verificationNotes += '</ul>';                   
        }

        if ((window.matchMedia("(max-width: 812px)").matches) && (window.matchMedia("(orientation: landscape)").matches)) {
          var indices_dom = swiperIndices.appendSlide(
            `<div class="swiper-slide"><img src="http://devshare.noesis.tech` +
              el.indicesImageUrl +
              `" id="indices-img" class="indices-image" alt="Indices-1"/><div class="sk-rating-border"><div class="sk-rating-content"><h5>` +
              el.indicesHeading +
              `</h5>
              <p>` +
              el.indicesSubHeading +
              `</p>
              <div>
                  <span class="score">
                      <div class="score-wrap">
                          <span class="stars-active" id="stars-active-` +
              el.id +
              `">
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                          </span>
                          <span class="stars-inactive">
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                          </span>
                      </div>
                      <span>
                          <img src="./assets/images/information.png" alt="Information icon" class="info-icon"
                           data-toggle="popover" data-trigger="hover" data-content="`+ verificationNotes +`"  data-placement="bottom" data-html="true"/>
                      </span>
                    </span>
                </div>
            </div>
        </div></div>`
          );
          $(indices_dom).appendTo("#sk-indices-wrapper");
        } else if(window.matchMedia("(max-width: 767px)").matches){
          var indices_dom = swiperIndices.appendSlide(
            `<div class="swiper-slide"><img src="http://devshare.noesis.tech` +
              el.indicesImageUrl +
              `" id="indices-img" class="indices-image" alt="Indices-1"/><div class="sk-rating-border"><div class="sk-rating-content"><h5>` +
              el.indicesHeading +
              `</h5>
              <p>` +
              el.indicesSubHeading +
              `</p>
              <div>
                  <span class="score">
                      <div class="score-wrap">
                          <span class="stars-active" id="stars-active-` +
              el.id +
              `">
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                          </span>
                          <span class="stars-inactive">
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                          </span>
                      </div>
                      <span>
                          <img src="./assets/images/information.png" alt="Information icon" class="info-icon"
                           data-toggle="popover" data-trigger="hover" data-content="`+ verificationNotes +`"  data-placement="bottom" data-html="true"/>
                      </span>
                    </span>
                </div>
            </div>
        </div></div>`
          );
          $(indices_dom).appendTo("#sk-indices-wrapper");
        }else {
          let indices = document.createElement("div");
          indices.className = "sk-ratings-section";
          var indices_dom =
            `<img src="http://devshare.noesis.tech` +
            el.indicesImageUrl +
            `" id="indices-img" class="indices-image" alt="Indices-1"/><div class="sk-rating-border"><div class="sk-rating-content"><h5>` +
            el.indicesHeading +
            `</h5>
              <p>` +
            el.indicesSubHeading +
            `</p>
              <div>
                  <span class="score">
                      <div class="score-wrap">
                          <span class="stars-active" id="stars-active-` +
            el.id +
            `">
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                          </span>
                          <span class="stars-inactive">
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                          </span>
                      </div>
                      <a href="#" data-toggle="popover" data-trigger="hover" data-content="`+ verificationNotes +`"  data-placement="bottom" data-html="true">
                          <img src="./assets/images/information.png" alt="Information icon" class="info-icon"/>
                      </a>
                    </span>
                </div>
            </div>
        </div>`;
          indices.innerHTML = indices_dom;
          $(indices).appendTo("#rating-display");
        }

        $("#stars-active-" + el.id).css("width", el.starRating * 20 + "%");
      });

      json.projectNews.forEach(el => {
        let projectnews_dom = swiperProject.addSlide(1, [
          ` <div class="swiper-slide">
                <div class="front">
                    <div class="uptime-image">
                        <img src="http://devshare.noesis.tech` +
            el.projectImageUrl +
            `" class="makers-image" />
                    </div>
                    <h3 class="maker-heading">` +
            el.projectHeading +
            `</h3>
                    <p class="maker-desc">` +
            el.projectContent +
            `</p>
                    <button class="btn btn-default" id="review-btn1" type="submit" onclick="javascript:window.open('` +
            el.projectReadMoreUrl +
            `', '_blank');">Read More<i class="fa fa-angle-right arrow-right"></i></button>
                </div>
            </div>`
        ]);
        $(projectnews_dom).appendTo("#sk-projectnews-wrapper");
      });

      $('[data-toggle="popover"]').popover();

      if (Number(json.feedbackCountSection)) {
        $(".feedbackCount").css("display", "block");
      } else {
        $(".feedbackCount").css("display", "none");
      }

      if (Number(json.feedbackDetail)) {
        $(".feedbackDetail").css("display", "block");
      } else {
        $(".feedbackDetail").css("display", "none");
      }

      if (Number(json.meetMakers)) {
        $(".meetMakers").css("display", "block");
      } else {
        $(".meetMakers").css("display", "none");
      }

      if (Number(json.loginDisplay)) {
        $(".loginSection").css("display", "block");
        $('.discount_broking').text('Our Beta Testers are busy perfecting your next discount broking platform. Sign up now to get 3 months of brokerage free trading, when we launch.');
      } else {
        $(".loginSection").css("display", "none");
        $('.discount_broking').text('We just finished shortlisting our Beta Testers. But, you can still register and get 3 months of brokerage free trading, when we launch.');
      }

      if (Number(json.projectNewsSection)) {
        $("#project-news-section").css("display", "block");
      } else {
        $("#project-news-section").css("display", "none");
      }
    // });

 
});


$(window).on('load', function(){
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");
  // history.pushState("http://tiger.foxymoron.tv/e/homepage/", null, "http://tiger.foxymoron.tv/homepage/");
});

 function getDynamicData() {
    $.ajax({
      url: ajax_url,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      headers: {
        Authorization: "Basic"
      },
      async: false,
      success: function(data, textStatus, jqXHR) {
        data = $.parseJSON(data);
        json = $.parseJSON(data.message);
        console.log("Homepage data ",json);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      }
    });
}



