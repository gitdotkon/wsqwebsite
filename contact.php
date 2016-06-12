<?php
require dirname(__FILE__).'/phpmailer/PHPMailerAutoload.php';

$body = '
	<b>Subject: </b>'.$_POST['subject'].'<br /><br />
	<b>Name: </b>'.$_POST['name'].'<br /><br />
	<b>Email: </b>'.$_POST['email'].'<br /><br />
	<b>Company name: </b>'.$_POST['company'].'<br /><br />
	<b>Message: </b><br />'.$_POST['message'].'<br />
';

//Create a new PHPMailer instance
$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = 'outlook.wanda.cn';
$mail->Port = '25';
$mail->Username = 'fc_0209';
$mail->Password = 'vfxcve21';
$mail->setFrom($_POST['email'], $_POST['username']);
$mail->addAddress('edouard@flow.asia', 'Edouard');
$mail->addAddress('dylan@flow.asia', 'Dylan');
//$mail->addAddress('dimonpdaa@gmail.com', 'Chris');
$mail->Subject = 'Contact from Wanda Studios';
$mail->msgHTML($body);

//send the message, check for errors
$r = $mail->send();
if (!$r) {
    echo json_encode(array('status' => $r));
} else {
    echo json_encode(array('status' => $r));
}

