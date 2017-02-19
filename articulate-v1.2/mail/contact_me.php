<?php
// check if fields passed are empty
//if(empty($_POST['name'])  		||
//   empty($_POST['email']) 		||
//   empty($_POST['message'])	||
//   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
//   {
//	echo "No arguments Provided!";
//	return false;
//   }
//
//$name = addslashes( $_POST['name'] );
//$email_address = addslashes( $_POST['email'] );
//$message = addslashes( $_POST['message'] );
//
//// create email body and send it
//$to = 'you@yourdomain.com'; // put your email address here
//$email_subject = "Contact form submitted by:  $name";
//$email_body = "You have received a new message. \n\n".
//				  " Here are the details:\n \nName: $name \n ".
//				  "Email: $email_address\n Message: \n $message";
//$headers = "From: noreply@yourdomain.com\n";
//// Since this email form will be generated from your server. The From email address will be best using something like this noreply@yourdomain.com
//$headers .= "Reply-To: $email_address";
//mail($to,$email_subject,$email_body,$headers);
//return true;

require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');

$mail = new PHPMailer;
$mail-> SMTPDebug = 0;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication

$mail->Username = EMAIL_USER;                 // SMTP username
$mail->Password = EMAIL_PASS;                 // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

$email = addslashes($_POST["email"]);
$subject = addslashes( $_POST["subject"]);
$body = addslashes( $_POST["message"] );

$mail->smtpConnect($options);
$mail->From = 'nrev864@gmail.com';//your email sending account
$mail->FromName = 'nrev';//your email sending account name
$mail->addAddress("vern864@gmail.com", "Vern");     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
$mail->addReplyTo($email); /* (email address of the person sending the message, so you can reply) */
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $subject;
$mail->Body    = $body;
$mail->AltBody = html_entity_decode($body);

$output = [];

$name = addslashes($_POST["name"]);
if ($name === "") {
    $output["errors"][] = "There is no name.";
}

if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
    $nameErr = "Name - Only letters and white space allowed";
    $output["errors"][] = $nameErr;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $emailErr = "Email - Invalid format";
    $output["errors"][] = $emailErr;
}

if ($subject === "") {
    $output["errors"][] = "There is no subject.";
}

if(!$mail->send()) {
    $output["errors"][] = 'Message could not be sent.';
    $output["errors"][] = "Mailer Error: " . $mail->ErrorInfo;
} else {
    $output["success"][] = 'Message has been sent';
}

echo json_encode($output);
?>
