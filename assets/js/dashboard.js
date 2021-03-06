const logFileText = async file => {
  return await fetch(file);
};
// var user_resp = $.parseJSON(existingData.user_resp);
$(document).ready(function() {
  //   $.getJSON("./assets/js/feedback.json", resp => {
  fetch("./assets/json/dashboard.json")
    .then(promise => promise.json())
    .then(json => {

        var user = localStorage.getItem("user");
        var welcomeMessage = document.createElement("div");
        welcomeMessage.className = "GreetingMessage";
        var welcomeMessage_dom =
            `<div class="greetingText"><h5>Welcome back, ` +
            user +
            `!</h5>
            <p> This is your feedback dashboard, you can find a summary and details
                of the feedback and new ideas you have shared with us below.</p></div>
                <button type="button" class="btn-give-feedback">Give Feedback</button>`;

        welcomeMessage.innerHTML = welcomeMessage_dom;
        $(welcomeMessage).appendTo("#welcomeMessage");

        //JSON for user rating
        json.user_rating.forEach(el => {
            var count_dom = 
            `<div class="count">`+ el.count + `</div>`

            $(count_dom).appendTo("#count-"+el.rating);
        });

        //JSON for Feeddback via Questionaire

        // var table = $('#paginationSimpleNumbers').DataTable();
        // populateRow();

        // function populateRow(){
        //     arrayList = [];
        //     json.feedback_via_questionnaire.forEach(el => {
        //         // feedback ={};
        //         // feedback["id"] = el.id ;
        //         // feedback["category"] = el.category;
        //         // feedback["suggestion"] = el.suggestion;
        //         // arrayList.push(feedback);
        //         var row = 
        //         `<td>` + el.id + `</td>
        //         <td>` + el.category + `</td>
        //         <td>` + el.suggestion + `</td>
        //         <td id="description-`+ el.id +`">` + el.description + `</td>`;
        //         html.push(row);
        //     });
        // }
        
        // json.feedback_via_questionnaire.forEach(el => {
        //     var dataRow = 
        //     `<tr>
            //    <td>` + el.id + `</td>
            //     <td>` + el.category + `</td>
            //     <td>` + el.suggestion + `</td>
            //     <td id="description-`+ el.id +`">` + el.description + `</td>
        //     </tr>`;

        //     $(dataRow).appendTo('#feedbackViaQuestionaire');

        //     var ratingRow = document.createElement("td");
        //     var ratingRow_dom = `<i class="fa fa-star" aria-hidden="true"></i>`;

        //     arr = [];
        //     for (let i = 0; i < el.rating; i++){
        //         arr.push(ratingRow_dom);
        //     }
        //     ratingRow.innerHTML = arr.join(' ');
        //     $(ratingRow).insertBefore('#description-'+el.id);
        // });
    });
});


// $('#paginationSimpleNumbers').DataTable({
    
//                 "pagingType": "simple_numbers" // "simple" option for 'Previous' and 'Next' buttons only
//             });
            // $('.dataTables_empty').css('display',"none");


// <tr>
//     <td>Hope Fuentes</td>
//     <td>Secretary</td>
//     <td>San Francisco</td>
//     <td>41</td>
//     <td>2010/02/12</td>
//     <td>$109,850</td>
// </tr>
