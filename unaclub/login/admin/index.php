<?php 



/*Variables to $link to the SQL server*/

$link = mysqli_connect("shareddb-n.hosting.stackcp.net", "taylor", "admin123", "secretdiary-313037722d");

/*Disconnect on failure*/

$errorVar = mysqli_connect_error();

if ($errorVar) {
  
    die("connection to database was unsuccessful");
}  

?>


<!doctype html>
<html lang="en">
  
  <style type='text/css'>
  
    h1 {
      background-color:darkgreen;
    }
  
  </style>
  
  <div > 
      
    <h1>
    
    ADMIN PAGE</h1>
  
    
    
</html>

    
  
