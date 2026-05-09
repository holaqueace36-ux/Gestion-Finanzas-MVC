<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "gestion_finanzas");

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $nombre = $data['nombre'];
    $email = $data['email'];
    $password = $data['password'];

    $sql = "INSERT INTO usuarios (nombre, email, password, rol) VALUES ('$nombre', '$email', '$password', 'user')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Usuario creado exitosamente"]);
    } else {
        echo json_encode(["error" => "El correo ya está registrado o hubo un error."]);
    }
}

$conn->close();
?>
