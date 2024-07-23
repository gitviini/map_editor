<?php

header('Access-Control-Allow-Origin: *');

include 'db.php';

function insert_model(mysqli $con, array $info)
{
    try {
        $name = $info[0];
        $content = $info[1];

        $exists = 0;

        $names = $con->query('SELECT name FROM models')->fetch_all();

        foreach ($names as $name_) {
            if ($name == $name_[0]) {
                $exists = 1;
            }
        }
        $sql = '';

        if ($exists) {
            $sql = "UPDATE models SET content = '$content' WHERE name = '$name'";
        } else {
            $sql = "INSERT INTO models(name,content) VALUES('$name','$content')";
        }

        $res = $con->query($sql);
        echo json_encode(array('res' => $res));
    } catch (Exception $err) {
    }
}

function insert_room(mysqli $con, array $info)
{
    try {
        $name = $info[0];
        $map = $info[1];
        $commands = $info[2];
        $floor = $info[3];

        $exists = 0;

        $names = $con->query('SELECT name FROM rooms')->fetch_all();

        foreach ($names as $name_) {
            if ($name == $name_[0]) {
                $exists = 1;
            }
        }
        $sql = '';

        if ($exists) {
            $sql = "UPDATE rooms SET map = '$map' WHERE name = '$name'";
        } else {
            $sql = "INSERT INTO rooms(name,map,commands,floor) VALUES('$name','$map','$commands','$floor')";
        }

        $res = $con->query($sql);
        echo json_encode(array('res' => $res));
    } catch (Exception $err) {
    }
}

function get_rooms(mysqli $con)
{
    try {
        $sql = 'SELECT * FROM rooms';
        $res = $con->query($sql)->fetch_all();

        echo json_encode(array('rooms' => $res));
    } catch (Exception $err) {
    }
}
function get_models(mysqli $con)
{
    try {
        $sql = 'SELECT * FROM models';
        $res = $con->query($sql)->fetch_all();

        echo json_encode(array('models' => $res));
    } catch (Exception $err) {
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $mode = $_POST['mode'];

    switch ($mode) {
        case 'insert_model':
            $name = $_POST['name'];
            $content = $_POST['content'];
            insert_model($con, array($name, $content));
            break;
        case 'get_models':
            get_models($con);
            break;
        case 'insert_room':
            $name = $_POST['name'];
            $map = $_POST['map'];
            $commmands = $_POST['commands'];
            $floor = $_POST['floor'];
            insert_room($con,array($name,$map,$commmands,$floor));
            break;
        case 'get_rooms':
            get_rooms($con);
            break;
        default:
            break;
    }
}
