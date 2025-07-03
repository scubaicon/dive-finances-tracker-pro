<?php
class Transaction {
    private $conn;
    private $table_name = "transactions";

    public $id;
    public $type;
    public $category;
    public $subcategory;
    public $amount;
    public $currency;
    public $payment_method;
    public $status;
    public $description;
    public $date;
    public $created_by;
    public $recurring;
    public $recurring_period;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                 SET type=:type, category=:category, subcategory=:subcategory, 
                     amount=:amount, currency=:currency, payment_method=:payment_method, 
                     status=:status, description=:description, date=:date, 
                     created_by=:created_by, recurring=:recurring, recurring_period=:recurring_period";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":subcategory", $this->subcategory);
        $stmt->bindParam(":amount", $this->amount);
        $stmt->bindParam(":currency", $this->currency);
        $stmt->bindParam(":payment_method", $this->payment_method);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":created_by", $this->created_by);
        $stmt->bindParam(":recurring", $this->recurring);
        $stmt->bindParam(":recurring_period", $this->recurring_period);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                 SET type=:type, category=:category, subcategory=:subcategory, 
                     amount=:amount, currency=:currency, payment_method=:payment_method, 
                     status=:status, description=:description, date=:date, 
                     recurring=:recurring, recurring_period=:recurring_period
                 WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":subcategory", $this->subcategory);
        $stmt->bindParam(":amount", $this->amount);
        $stmt->bindParam(":currency", $this->currency);
        $stmt->bindParam(":payment_method", $this->payment_method);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":recurring", $this->recurring);
        $stmt->bindParam(":recurring_period", $this->recurring_period);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>