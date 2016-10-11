<?php

require 'vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;


// Here you should set your db connection parameters
define("DATABASE_NAME", "your_db");
define("HOST", "localhost");
define("USER", "user");
define("PASSWORD", "password");

$app = new \Slim\App(["settings" => $config]);

/**
* Create the connection with the db. 
* Modify the variables in order to change db
*/
function databaseConnection()
{
  $host = HOST;
  $user = USER;
  $pass = PASSWORD;
  $db = DATABASE_NAME;

  // PDO
  return new PDO('mysql:host='.$host.';dbname='.$db, $user, $pass);
}

/**
* Return refill data about the {year}, {month} grouped by totem
*/
$app->get('/tsop_ricarica/{year}/{month}', function ($request, $response, $args) {
  $pdo = databaseConnection();
  $year = intval($request->getAttribute('year'));
  $month = intval($request->getAttribute('month'));

  $sql = "SELECT descrizione as totem, COUNT(*) as num_refill, SUM(importo_caricato) as total, id_totem FROM tsop_ricarica JOIN tsop_totem_ricarica ON id_totem=codice WHERE mese = :month AND anno = :year GROUP BY codice";
  $statement = $pdo->prepare($sql);
  $statement->bindParam(':month', $month);
  $statement->bindParam(':year', $year);
  $statement->execute();

  $jsonres = array();
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $element = json_encode($row);
    $jsonres[] = json_decode($element);
  }
  $json = json_decode(json_encode($jsonres, JSON_PRETTY_PRINT));
  
  #print in console
  #   file_put_contents('php://stderr', print_r($foo, TRUE))

  $response->withStatus(200);
  $response->withHeader('Content-Type', 'application/json');
  $response = $response->withJson($json);
  return $response;
});

/**
* Return refill data about the {year}, {month}, {day} grouped by totem
*/
$app->get('/tsop_ricarica/{year}/{month}/{day}', function ($request, $response, $args) {
  $pdo = databaseConnection();
  $year = intval($request->getAttribute('year'));
  $month = intval($request->getAttribute('month'));
  $day = intval($request->getAttribute('day'));

  $sql = "SELECT descrizione as totem, COUNT(*) as num_refill, SUM(importo_caricato) as total, id_totem FROM tsop_ricarica JOIN tsop_totem_ricarica ON id_totem=codice WHERE mese = :month AND anno = :year and giorno = :day GROUP BY codice";
  $statement = $pdo->prepare($sql);
  $statement->bindParam(':month', $month);
  $statement->bindParam(':year', $year);
  $statement->bindParam(':day', $day);
  $statement->execute();

  $jsonres = array();
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $element = json_encode($row);
    $jsonres[] = json_decode($element);
  }
  $json = json_decode(json_encode($jsonres, JSON_PRETTY_PRINT));
  
  #print in console
  #   file_put_contents('php://stderr', print_r($foo, TRUE))

  $response->withStatus(200);
  $response->withHeader('Content-Type', 'application/json');
  $response = $response->withJson($json);
  return $response;
});

/**
* Return data about the types of meal in each canteen in the three weeks before the selected date
*/
$app->get('/3weeks_passaggi/{year}/{month}/{day}', function ($request, $response, $args) {
  $pdo = databaseConnection();
  $year = intval($request->getAttribute('year'));
  $month = intval($request->getAttribute('month'));
  $day = intval($request->getAttribute('day'));

  $selected_date = strtotime($request->getAttribute('year') . "-" . $request->getAttribute('month') . "-" .  $request->getAttribute('day'));

  // get week number in the year from selected date
  $weekNumber = date("W", $selected_date);
  $weekLowerLimit = $weekNumber - 2;

  // TODO: we need to handle the case of the week number smaller then 3. In this case we are cross year and we need to modify our query!!
  $sql = "SELECT WEEK(data_passaggio) as week, descrizione_mensa as mensa, codice_mensa, SUM(tipo_prodotto = 'INTERO') as intero, SUM(tipo_prodotto = 'SNACK2') as snack2, SUM(tipo_prodotto = 'SNACK1') as snack1, SUM(tipo_prodotto = 'RIDOTTO') as ridotto, SUM(tipo_prodotto = 'PASTOLESTO') as pasto_lesto from elenco_passaggi where WEEK(data_passaggio)<= :top_limit and WEEK(data_passaggio)>=:low_limit and anno_passaggio=:year group by week, mensa";

  //return $weekNumber . " " . $weekLowerLimit;
  $statement = $pdo->prepare($sql);
  $statement->bindParam(':top_limit', $weekNumber);
  $statement->bindParam(':low_limit', $weekLowerLimit);
  $statement->bindParam(':year', $year);
  $statement->execute();

  $jsonres = array();
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $element = json_encode($row);
    $jsonres[] = json_decode($element);
  }
  $json = json_decode(json_encode($jsonres, JSON_PRETTY_PRINT));
  
  #print in console
  #   file_put_contents('php://stderr', print_r($foo, TRUE))

  $response->withStatus(200);
  $response->withHeader('Content-Type', 'application/json');
  $response = $response->withJson($json);
  return $response;
});

function getStartAndEndDate($week, $year)
{

    $time = strtotime("1 January $year", time());
    $day = date('w', $time);
    $time += ((7*$week)+1-$day)*24*3600;
    $return[0] = date('Y-n-j', $time);
    $time += 6*24*3600;
    $return[1] = date('Y-n-j', $time);
    return $return;
}

$app->run();
