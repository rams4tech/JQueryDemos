$(document).ready(function(){
    //$("#grid-basic").bootgrid();
    $("#personTable").load(loadPerson());
    function loadPerson() {
        console.log("1"+new Date());
        $( "#result-temp" ).html( "<strong>Before the Ajax Call the message is shown</strong> " );
        $.ajax({
            url: "../../data/personData",
            dataType: 'text',
            type: 'get',
            success: function( response ) {
                console.log("3"+new Date());
                var resultJSON = $.parseJSON(response);
                console.log(resultJSON);
                /*var resultPerson = resultJSON.person[0];
                var msg = "Name:"+resultPerson.firstName + ' '+ resultPerson.lastName +"<br/> age:"+resultPerson.age+"<br/> ";
                console.log(msg);
                $( "#result-temp" ).html( "<strong>" + msg + "</strong>" );*/

                $('#personTable tr').not(':first').remove();
                var html = '';
                for(var i = 0; i < resultJSON.person.length; i++) {

					html += '<tr><td>' + resultJSON.person[i].firstName + '</td><td>'+
                    resultJSON.person[i].lastName + '</td><td>'
                    + resultJSON.person[i].age + '</td></tr>';
                }
                console.log(html);
                $('#personTable tr').first().after(html);
            },
            error: function(response){
                console.log(response);
                $( "#result-temp" ).html( "<strong> Failed to get the authordata.json from the server </strong>" );
            }
        });
        console.log("2"+new Date());
        $( "#result-temp" ).html( "<strong>Request is sent to the server to get the response and it is shown through call back</strong> " );
    }

    // Needed to simulate a JSON response
    var fakeResponse = {
        status: "error",
        message: "Username already in use"
    };

    $('input').change(function() {
        var data = {};
        data[this.name] = this.value;

        if (this.value) {
            $.get(
                'http://codepen.io/SitePoint/pen/339dd919e6b771f6c7edea3c8815b088.html',
                data,
                function (responseText) {
                    console.log(responseText);
                    /*if (fakeResponse.status === 'error') {
                        $('#notification-bar')
                            .html('<p>' + fakeResponse.message + '<p>')
                    }*/

                    $('#notification-bar')
                        .html(responseText);
                });
        }
    });

    $('input').focus(function() {
        $('#notification-bar').html('');
        $(this)[0].value ='';
    });
});