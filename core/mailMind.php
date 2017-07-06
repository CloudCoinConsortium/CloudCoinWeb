<?php
$email = "";

$snlist= "";
$message = "";

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $email = test_input($_POST["email"]);
    $sn = $_POST["sn"];
    for($x = 0; $x < count($sn); $x++){
        $sn[$x] = test_input($sn[$x]);
        $snlist .= $sn[$x] . "\n";
    }
    
}
$message = "Coins with the following Serial Numbers\n have been saved to your Mind:\n";
$message .= $snlist;
$message .= "Hold on to this receipt in case you need to recover your coins.";

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

mail($email, "CloudCoin Mind Storage Receipt", $message);



?>
