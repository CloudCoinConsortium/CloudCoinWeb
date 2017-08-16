<?php


function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}


$snlist= "";
$message = "";

if($_SERVER["REQUEST_METHOD"] == "POST"){
    echo "attempting ";
    $email = test_input($_POST["email"]);
    $sn = $_POST["sn"];
    for($x = 0; $x < count($sn); $x++){
        if(is_numeric($sn[$x])){
        $snlist .= $sn[$x] . "\n";

        }
    }

}
$message = "Coins with the following Serial Numbers\n have been saved to your Mind:\n";
$message .= $snlist;
$message .= "Hold on to this receipt in case you need to recover your coins.";

if(empty($email))
{
    http_response_code(400);
    echo "not happening ";
}

mail($email, "CloudCoin Mind Storage Receipt", $message);

echo "sent email to" . $email;

?>
