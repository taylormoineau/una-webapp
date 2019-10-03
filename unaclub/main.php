<?php 

session_start();

  
  
/*Variables to $link to the SQL server*/

$link = mysqli_connect("shareddb-n.hosting.stackcp.net", "taylor", "admin123", "secretdiary-313037722d");

/*Disconnect on failure*/

$errorVar = mysqli_connect_error();

if ($errorVar) {
  
    die("connection to database was unsuccessful");
}  

/*Make sure the email field is not empty*/

if (!$_POST["email"] && !$_POST["emailLogin"]) {
  
  $errorMessage .= "<br> Please enter a valid email address."; }

/*Make sure the password field is not empty*/

if (!$_POST["password"]  && !$_POST["passwordLogin"]) {
  
  $errorMessage .= "<br> Please enter a secure password.";

} 

/*Display errors, else begin email/password submission*/

if ($errorMessage != "") {
  
  print_r("<div class='alert alert-danger fixedPlacement' role='alert'>
  Please correct the following fields: " . $errorMessage . "</div>");
  
} else {
  
  if ($_POST["email"]) {
    
    /*New account confirm*/ 
  
  $query = "SELECT id FROM diaryusers WHERE email='".mysqli_real_escape_string($link, $_POST["email"])."'";
  
  $result = mysqli_query($link, $query);
  
    /*If this account already exists, then end*/
    
  if (mysqli_num_rows($result) > 0) {
    
    print_r("<div class='alert alert-danger fixedPlacement' role='alert'>
  This account has already been registered! Log in below.
</div>");
  } 
  
  /*Otherwise, create new user with email and password*/
  
  else {
    
    $query = "INSERT INTO diaryusers(email , password) VALUES ('" . mysqli_real_escape_string($link, $_POST["email"]) . "','" . mysqli_real_escape_string($link, $_POST["password"]) . "')";
    
    /*If for any reason it fails to submit new account info*/
    
    if (!mysqli_query($link, $query)) {
      
      print_r("<div class='alert alert-danger fixedPlacement' role='alert'>
  There is some issue regarding the server right now. Please try again later.
</div>");
        
    } else {
      
      /*Take the new password and immediately hash it*/
      
      $query = "UPDATE diaryusers SET password ='" . password_hash($_POST['password'], PASSWORD_DEFAULT) . "' WHERE id=" . mysqli_insert_id($link) . " LIMIT 1";
      
      mysqli_query($link, $query);
    
      /*Display successful sign up*/
      
    print_r("<div class='alert alert-success fixedPlacement' role='alert'>
  Account registered! Log in below for your secret page!
</div>");
    
    
      }
    }
  } else { 
    
    /*If they are not using sign up form, but rather login form*/
    
    if ($_POST["emailLogin"]) {
    
    /*Password is correct confirm*/
      
    $query = "SELECT * FROM diaryusers WHERE email='". mysqli_real_escape_string($link, $_POST["emailLogin"]). "'";
      
      $result = mysqli_query($link,$query);
      
      $row= mysqli_fetch_array($result);
      
      $passwordTest = password_verify($_POST["passwordLogin"],$row["password"]);
      
      
      
      
      /*If we pass the password check, check account status: admin? sponsor? translator? host? else send to member page.*/
      
      
      
      if ($passwordTest) {
        
        /*Set the type of user in DB (column 4 currently). "member" is default*/
        
        $userType = $row[3];
        
        $_SESSION["userType"] = $userType;
        
        /*Check if they want to stay logged in for a 60-day cookie*/
        
        if ($_POST["cookieButton"]) {
          
          setcookie("userType", $userType, time() *60*60*24*60);
        }
       
        
        
  $address = "Location: http://daddymoineaupractice-com.stackstaging.com/Secret-Diary/login/".$userType."/index.php";
  
         /*Send them to their corrosponding webpage*/
         
  header($address);
  
} 
    
}
      }
    }
  


?>



<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <!--JQuery-->
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  
      
 
    <title>UNA Club</title>
    
    <!--My CSS-->
    
    <link rel="stylesheet" href="mainpagestyles.css" />
  
  
  </head>
  
  <body>
   
    <!--Fancy blue/green boxes for javascript animations-->
    
    <div id="green"></div>
    <div id="blue"></div>
     
<div class="container" id="mainBox">
   <h1>Secret Diary log-in or sign up:</h1>
  
  <!--Form for registering, initially shown-->
  <form method="post" id="registerForm">

    <div class="form-group" id="emailGroupReg">

      <label for="exampleInputEmail1">Email address</label>

      <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" id="emailInput">

      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>

       </div>

       <div class="form-group" id ="passwordGroupReg">

         <label for="exampleInputPassword1">Password</label>

         <input type="password" class="form-control" placeholder="Password" name="password" id="passwordInput">

       </div>
    
 
     <button type="submit" class="btn btn-success buttons">Submit</button>
    
    <p id="loginP" class="switches"> Already have an account? <a href=# id="loginSwitch">Log in.</a></p>

      </form>
  
  
  
  
  
  <!--Form for logging in, initially hidden-->
  <form method="post" id="loginForm" class="hidden">

    <div class="form-group" id="emailGroupLog">

      <label for="exampleInputEmail1">Log in with email address:</label>

      <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="emailLogin" id="emailLogin">

       </div>

       <div class="form-group" id ="passwordGroupLog">

         <label for="exampleInputPassword1">Password</label>

         <input type="password" class="form-control" placeholder="Password" name="passwordLogin" id="passwordLogin">

       </div>

       <div class="form-group form-check">

      <input type="checkbox" class="form-check-input" id="exampleCheck1" name="cookieButton">

         <label class="form-check-label" for="exampleCheck1">Stay logged in</label>

       </div>

       <button type="submit" class="btn btn-primary buttons">Log in</button>
    
    <p id="loginP" class="switches"> Don't have an account? <a href=# id="registerSwitch">Sign up!</a></p>

      </form>
  
    </div>
    
    
    

    
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
   
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    
      <script type="text/javascript"> 
        
        /*Function for showing Login elements*/
        
        function loginToggle() {
          
          $("#emailInput").val("");
          
          $("#passwordInput").val("");
          
          $("#registerForm").hide();
              
        $("#loginForm").show();
        
        $('#blue').animate({
        width:"100%"}, 250);
          
          
          
        }
        
        /*Function for showing Register elements*/
        
        function registerToggle() {
          
          $("#emailLogin").val("");
          
          $("#passwordLogin").val("");
          
          $("#loginForm").hide();
              
        $("#registerForm").show();
       
       $('#blue').animate({
        width:"0%"}, 300);
          
        }
        
        /*When "Log in." is clicked*/
        
      $("#loginSwitch").click(function(){
        
        loginToggle();
      
      });
        
        /*When "Sign up!" is clicked*/
        
     $("#registerSwitch").click(function(){
        
        registerToggle();
       

            });
          
          
      
      
    </script>
    
    
    
    
    
    
    
  </body>
</html>

    
  
