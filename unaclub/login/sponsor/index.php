<?php 

session_start();


$testArray = array('fruit1' => false,
    'fruit2' => false,
    'fruit3' => false,
    'fruit4' => false,
    'truestatement' => true);
        
        /*while ($i >= 0) {
          
          
          
          if ($testArray[$j] == true) {
            echo key($testArray[$j]);
            $i++;
          }
          
          $j++;
          echo $j;*/
          
$keyTest =array_keys($testArray, true);
echo $keyTest[0];


        

?>
    
  
