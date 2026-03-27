<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: Contacto.html");
    exit;
}

$nombre  = trim($_POST["nombre"] ?? "");
$correo  = trim($_POST["correo"] ?? "");
$mensaje = trim($_POST["mensaje"] ?? "");

if ($nombre === "" || $correo === "" || $mensaje === "") {
    echo "Todos los campos son obligatorios.";
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo "El correo no es válido.";
    exit;
}

$destinatario = "atencionalcliente.delhuerto@gmail.com";
$asunto = "Nuevo mensaje desde Del Huerto Artesanal";

$contenido = "Has recibido un nuevo mensaje desde el formulario web:\n\n";
$contenido .= "Nombre: " . $nombre . "\n";
$contenido .= "Correo: " . $correo . "\n\n";
$contenido .= "Mensaje:\n" . $mensaje . "\n";

$cabeceras = "From: atencionalcliente.delhuerto@gmail.com\r\n";
$cabeceras .= "Reply-To:  " . $correo . "\r\n";
$cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($destinatario, $asunto, $contenido, $cabeceras)) {
    header("Location: Contacto.html?ok=1");
    exit;
} else {
    echo "No se pudo enviar el mensaje.";
}
?>