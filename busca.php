<?php
    require_once('bd.php');

    $obj = new bdlocal();
    $conn = $obj->conecta_mysql();
    $stmt = $conn->prepare("SELECT * FROM Pessoa ");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
