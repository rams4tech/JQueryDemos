$(document).ready(function(){

    $("#empListDiv").load(loadPerson());
    function loadPerson() {
        $("#result-temp" ).html( "<strong> Loading Employees List from the server </strong>" );
        $.ajax({
            url: "http://localhost:9090/SystemInfo/rest/employee/list",
            dataType: 'jsonp',
            success: function( response ) {
                console.log(response);
                console.log(response.length);
                console.log(response[0]);
                //var resultJSON = $.parseJSON(response);
                /*console.log(resultJSON);*/
                //$('#empListTable tr').not(':first').not(':last').remove();
                var html = '<table id="empListTable"><tr><th>EMP ID</th><th>First Name</th><th>Last Name</th><th>Date Of Birth</th>';
                html += '<th>Date Of Joining</th><th>Email Id</th><th>Phone Number</th><th>Action</th></tr>';
                for(var i = 0; i < response.length; i++) {
                    var empId=response[i].empid;
                    var deleteHtml = '<td><a href="deleteEmployee.html?empId='+empId+'">Delete</a></td>';
                    //var viewHtml = '<td><a href="viewEmployee.html?empId='+empId+'">'+empId+'</a></td>';
                    var viewHtml = '<td><a href="viewEmployeeData.html?empid='+empId+'">'+empId+'</a></td>';
                    html += '<tr>' + viewHtml +'<td>' + response[i].firstName + '</td><td>'+
                    response[i].lastName + '</td><td>' + response[i].dob +  '</td><td>' + response[i].doj + '</td><td>' + response[i].emailId + '</td><td>'+
                    + response[i].phoneNum + '</td>' + deleteHtml +'</tr>';
                }
                //$('#empListTable tr').first().after(html);
                $('#empListDiv').html(html);

                $( "#result-temp" ).html( "<strong> Successfully got the Employees List from the server</strong>" );
            },
            error: function(response){
                console.log(response);
                $( "#result-temp" ).html( "<strong> Failed to get the Employees List from the server </strong>" );
            }
        });
    }

    $('#empViewTable').load(viewPerson());

    function viewPerson() {
        $( "#result-temp" ).html( "<strong> In progress to get the Employees Data from the server </strong>" );
        var empId = getParameterByName("empId");
        console.log("employee id:"+empId);
        $.ajax({
            url: "http://localhost:9090/SystemInfo/rest/employee/"+empId,
            dataType: 'json',
            success: function( response ) {
                console.log("Response from Server:"+response);
                //console.log(response.length);
                var html = '';
                if (response != null) {
                    console.log(response.empid);

                    $('#empid').html(response.empid);
                    $('#firstName').html(response.firstName);
                    $('#lastName').html(response.lastName);
                    $('#emailId').html(response.emailId);
                    $('#dob').html(response.dob);
                    $('#doj').html(response.doj);
                    $('#phoneNum').html(response.phoneNum);
                    $( "#result-temp" ).html( "<strong> Successfully to get the Employees Data from the server </strong>" );
                    /*$('.empData').each(function () {

                        var lastColumn = $(this).html();
                        var replaceValue = lastColumn + "Changed Content";

                        jQuery(this).html(replaceValue);
                    });*/
                }
            },
            error: function(response){
                console.log(response);
                $( "#result-temp" ).html( "<strong> Failed to get the Employees Data from the server </strong>" );
            }
        });
    };

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    //$('#deleteEmployee').load(removePerson());
});