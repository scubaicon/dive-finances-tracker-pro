<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Transaction.php';

$database = new Database();
$db = $database->getConnection();
$transaction = new Transaction($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $transaction->read();
        $transactions = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $transaction_item = array(
                "id" => $row['id'],
                "type" => $row['type'],
                "category" => $row['category'],
                "subcategory" => $row['subcategory'],
                "amount" => (float)$row['amount'],
                "currency" => $row['currency'],
                "paymentMethod" => $row['payment_method'],
                "status" => $row['status'],
                "description" => $row['description'],
                "date" => $row['date'],
                "createdBy" => $row['created_by'],
                "recurring" => (bool)$row['recurring'],
                "recurringPeriod" => $row['recurring_period']
            );
            array_push($transactions, $transaction_item);
        }

        http_response_code(200);
        echo json_encode($transactions);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->type) && !empty($data->category) && !empty($data->amount)) {
            $transaction->type = $data->type;
            $transaction->category = $data->category;
            $transaction->subcategory = $data->subcategory ?? '';
            $transaction->amount = $data->amount;
            $transaction->currency = $data->currency;
            $transaction->payment_method = $data->paymentMethod;
            $transaction->status = $data->status;
            $transaction->description = $data->description;
            $transaction->date = $data->date;
            $transaction->created_by = $data->createdBy;
            $transaction->recurring = $data->recurring ? 1 : 0;
            $transaction->recurring_period = $data->recurringPeriod ?? null;

            if($transaction->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "Transaction created."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create transaction."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create transaction. Data is incomplete."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->id)) {
            $transaction->id = $data->id;
            $transaction->type = $data->type;
            $transaction->category = $data->category;
            $transaction->subcategory = $data->subcategory ?? '';
            $transaction->amount = $data->amount;
            $transaction->currency = $data->currency;
            $transaction->payment_method = $data->paymentMethod;
            $transaction->status = $data->status;
            $transaction->description = $data->description;
            $transaction->date = $data->date;
            $transaction->recurring = $data->recurring ? 1 : 0;
            $transaction->recurring_period = $data->recurringPeriod ?? null;

            if($transaction->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "Transaction updated."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update transaction."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update transaction. ID is required."));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->id)) {
            $transaction->id = $data->id;

            if($transaction->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "Transaction deleted."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete transaction."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete transaction. ID is required."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>