<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Заявка на обратный вызов";

$c = true;

if(trim(!empty($_POST['name']))){
   $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}if(trim(!empty($_POST['email']))){
   $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['tel']))){
   $body.='<p><strong>Телефонный номер:</strong> '.$_POST['tel'].'</p>';
	}

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;

  // Настройки вашей почты
  $mail->Host       = 'smtp.gmail.com'; 
  $mail->Username   = 'temirbolatov17@gmail.com'; 
  $mail->Password   = ''; 
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('temirbolatov17@gmail.com', 'Заявка с вашего сайта'); 

  // Получатель письма
  $mail->addAddress('khamit.bekzhan@gmail.com');
  $mail->addAddress('temirbolatov17@gmail.com');

   // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}