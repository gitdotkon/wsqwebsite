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
$mail->SMTPDebug = 2;
$mail->SMTPAuth = true;
$mail->Port = 25;
$mail->Host = 'mail.wanda.com.cn';
$mail->Port = '25';
$mail->Username = 'fc_0206';
$mail->Password = 'd5ntfh03';
$mail->setFrom('fc_0206@wanda.com.cn');
//$mail->addAddress('dylan@flow.asia', 'Dylan');
//$mail->addAddress('dimonpdaa@gmail.com', 'Chris');
$mail->addAddress('info@wandastudios.com', 'Wanda Studios');
$mail->Subject = 'Contact from Wanda Studios';
$mail->msgHTML($body);

//send the message, check for errors
$r = $mail->send();
if (!$r) {
    echo json_encode(array('status' => $r));
} else {
    echo json_encode(array('status' => $r));
}

