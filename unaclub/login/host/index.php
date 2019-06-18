<?php 

session_start();



/*Variables to $link to the SQL server*/

$link = mysqli_connect("shareddb-n.hosting.stackcp.net", "taylor", "admin123", "secretdiary-313037722d");



/*Disconnect on failure*/

$errorVar = mysqli_connect_error();

if ($errorVar) {
  
    die("connection to database was unsuccessful");
}  


$query = "SELECT * FROM diaryusers WHERE email='member@gmail.com'";
      
      $result = mysqli_query($link,$query);

      $row = mysqli_fetch_array($result);

if ($row[3]) {
  $address = "Location: http://daddymoineaupractice-com.stackstaging.com/Secret-Diary/login/".$row[3]."/index.php";
  
  header($address);
  
} else {
  
  header("Location: http://www.google.com");
    
}


?>


<!doctype html>
<html lang="en">
  
  <style type='text/css'>
  
    h1 {
      background-color:thistle;
    }
  
  </style>
  
  <div > 
      
    <h1>
    
   HOST PAGE</h1>
  
    
    
</html>

    
  
