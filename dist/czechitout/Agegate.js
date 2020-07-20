/* Based on http://www.webdeveloper.com/forum/showthread.php?253028-Birthday-Validation-mm-dd-yyyy */

function Validateform(){
    var email=document.form1.email;
    var firstname=document.form1.firstname;
    var lastname=document.form1.lastname;
    var state=document.form1.state;
    var birthday=document.form1.birthday;
    var reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;    
    var valid = "0123456789/";
    var slashcount = 0;
    
    
    if ((email.value==null)||(email.value=="")){
        alert("Please enter an email address");
        email.focus();
        return false;
    }
    if (reEmail.test(email.value)==false){
          alert ("Please enter a valid email address");
           email.focus();
           return false;
       }
        if ((firstname.value=="")||(firstname.value==null)) {
        alert("Please enter a first name");
        firstname.focus();
        return false;
    }
    
    if ((lastname.value=="")||(lastname.value==null)) {
        alert("Please enter a last name");
        lastname.focus();
        return false;
    }    
    if (state.selectedIndex==0 ) {
        alert("Select state");
        state.focus();
        return false;
    }
    if ((birthday.value=="")||(birthday.value==null)) {
        alert("This field is required. Please enter date mm/dd/yyyy!")
        birthday.focus();
        return false;
     }
         
     if (birthday.length!=10) {
        alert("Invalid date! The correct date format is like '01/01/2004'. Please try again.")
         return false;
     }

         for (var i=0; i < birthday.length; i++)
         {
         temp = "" + birthday.substring(i, i+1);
         if (temp == "/") 
         slashcount++;
         if (valid.indexOf(temp) == "-1") {
         alert("Invalid characters in your date. Please try again.")
         return false;
     }
         if (slashcount != 2) {
       alert("Invalid Date! The correct date format is like '01/01/2004'. Please try again.")
         return false;
     }
         if((birthday.charAt(2)!= '/')||( birthday.charAt(5) != '/')) {
         alert("Invalid date! The correct date format is like '01/01/2004'. Please try again.")
         return false
    }
}
    return true
    }


</script>


<style type="text/css">
.style1 {
    text-align: center;
    font-size: x-large;
}
.style2 {
    text-align: center;
}
.style3 {
    text-align: left;
}
.style4 {
    text-align: right;
}
.style5 {
    text-align: left;
    margin-left: 160px;
}
</style>

</head>

<body style="color: #FFFFFF; background-color: #000000">

<div class="style2">

<p class="style1"><strong>Add Contact</strong></p>

<?php
// Show the form
if(!$_POST['Submit'])
{

?>

<form action="<?=$_SERVER['PHP_SELF']?>" method="post" id="form1" name="form1" onsubmit="return Validateform();">
    <div class="style3">
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Required Field</div>
            <table style="width: 100%">
    <tr>
        <td style="width: 219px; height: 23px" valign="top" class="style4">*E-mail Address:</td>
      <td style="height: 23px" class="style3">
        <input name="email" id="email" type="text"   width="250px" size="50" />
        </td>
    </tr>
    <tr><td class="style4">*First Name:</td><td class="style3"><input type="text" name="firstname" id="firstname" size="30" width="250px"/></td></tr>
    <tr>
        <td class="style4" >*Last Name:</td><td class="style3" ><input name="lastname" id="lastname" type="text"  size="30" width="250px"/></td>
    </tr>
    <tr><td class="style4">Phone:</td><td class="style3"><input type="text" name="phone" id="phone" size="15" width="250px" /></td></tr>
    <tr>
      <td class="style4">Birthday:</td><td class="style3">
        <input type="text" name="birthday" id="birthday" size="50" style="width: 188px" /></td></tr>
    <tr>
      <td class="style4">Address Line 1:</td><td class="style3"><input type="text" name="address1" id="address1" size="50" width="250px" /></td></tr>
    <tr>
      <td class="style4">Address Line 2:</td><td class="style3"><input type="text" name="address2" id="address2" size="50" width="250px" /></td></tr>
    <tr><td class="style4">City:</td><td class="style3"><input type="text" name="city" id="city" size="50"  width="250px"/></td></tr>
    <tr><td class="style4">*State:</td><td class="style3"><select name="state" id="state">
                    <option></option>
                    <option>NJ</option>
                    <option>NY</option>
                    
                </select></td></tr>
    <tr><td class="style4">Zip:</td><td class="style3"><input type="text" name="zip" id="zip" size="5" /></td></tr>
</table>
                        
<p class="style3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input name="Submit" type="submit" value="Submit" />&nbsp;</p>
    <p class="style5"><a href="show_contacts.php">Administrative Area</a><br />
</p>
</form>

<?php

}
else
{
// The form has been submitted; process form

include("dl.php");

$email=$_POST['email'];
$lastname=$_POST['lastname'];
$firstname=$_POST['firstname'];
$phone=$_POST['phone'];
$address1=$_POST['address1'];
$address2=$_POST['address2'];
$birthday=$_POST['birthday'];
$city=$_POST['city'];
$state=$_POST['state'];
$zip=$_POST['zip'];
$query = "INSERT INTO person (Email, Last_Name,First_Name,phone,address1,address2,birthday,city,state,zip) VALUES ('$email','$lastname','$firstname','$phone','$address1','$address2','$birthday','$city','$state','$zip')";

if (!mysql_query($query,$con))
  { 
      die('Error: ' . mysql_error());
  }
else {
    echo "<center><b> Contact info for $firstname $lastname has been successfully added; If you are 30-60 years old you will receive a middle age discount.  If you are 60 or older you will receive a senior citizen discount. </b><a href='show_contacts.php'>Administrative Area</a></center>";
}

mysql_close();

}
?>