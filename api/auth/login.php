<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if(!empty($data->username) && !empty($data->password)) {
        $user->username = $data->username;
        $user->password = $data->password;

        if($user->login()) {
            http_response_code(200);
            echo json_encode(array(
                "message" => "Login successful.",
                "user" => array(
                    "id" => $user->id,
                    "username" => $user->username,
                    "name" => $user->name,
                    "role" => $user->role
                )
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Invalid credentials."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Username and password required."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>