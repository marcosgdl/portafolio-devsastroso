<?php
// upload.php - VERSIÓN SEGURA Y COMPATIBLE

// 1. PERMISOS CORS
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 2. INTERCEPTOR DE 'OPTIONS'
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$target_dir = "../music/"; 
$target_file = $target_dir . "marcos.mp3";
$response = array("success" => false, "message" => "Ocurrió un error.");

// (Salvavidas) Si la carpeta "music" no existe, la creamos automáticamente
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

// 3. VERIFICACIÓN DE CONTRASEÑA EN EL SERVIDOR
$clave_secreta = "chocoflana"; 
$clave_recibida = isset($_POST['password']) ? $_POST['password'] : '';

if($clave_recibida !== $clave_secreta) {
    $response["message"] = "Acceso denegado. Contraseña incorrecta.";
    echo json_encode($response);
    exit; 
}

// 4. VERIFICACIÓN DE ARCHIVO (SIN USAR FINFO)
if(isset($_FILES["file"])) {
    $temp_file = $_FILES["file"]["tmp_name"];
    
    // Obtenemos la extensión real del archivo subido (ej. "mp3")
    $extension = strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION));
    
    // Obtenemos el tipo que nos declara el navegador (ej. "audio/mpeg")
    $tipo_declarado = $_FILES["file"]["type"];
    
    // Validamos que termine en mp3 Y que el navegador lo identifique como audio
    if($extension !== "mp3" || strpos($tipo_declarado, 'audio/') !== 0) {
        $response["message"] = "¡Bloqueado! Solo se permiten archivos de audio MP3.";
    } else {
        // Movemos el archivo a la carpeta final
        if (move_uploaded_file($temp_file, $target_file)) {
            $response["success"] = true;
            $response["message"] = "¡Música actualizada de forma segura!";
        } else {
            $response["message"] = "Error al guardar. Verifica los permisos de la carpeta /music.";
        }
    }
} else {
    $response["message"] = "No se recibió ningún archivo.";
}

echo json_encode($response);
?>