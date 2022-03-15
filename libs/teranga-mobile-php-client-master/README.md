Installation options :

1. Require the [composer](https://getcomposer.org/) package :

```sh
composer require assaneonline/teranga-mobile-php-client
````

2. Clone this repository from GitHub :

```sh
git clone https://github.com/assaneonline/teranga-mobile-php-client.git
```

then include the autoload in your PHP project :

```php
require_once(path_to_this/vendor/autoload.php)
```


Handling a search request from a remote server
===

Here is an example of to receive handle a search request from a deployed Teranga Mobile form (directly from the tablet).

```php
use TerangaMobile\Client;

$terangaMobileClient = new Client([
    "application_id" => "<REPLACE_WITH_YOUR_APPLICATION_ID>",
    "application_secret" => "<REPLACE_WITH_YOUR_APPLICATION_SECRET>"
]);

$question_uid = $terangaMobileClient->getSearchFieldUid();
$input_query = $terangaMobileClient->getSearchFieldQuery();

// TODO :
// Given the $input_query and the question ID ($question_uid), client application should perform search and send the results back.
// Below is a template array showing how to format results :
$results = [
    // List of results
    [
        "key" => "opt1", // Uniquely identifies this result (not shown to user)
        "value" => "" // Label to display back to user in the dropdown list
    ]
];

$responseData = [
    "status" => "ok",       // Set to "ok" or "ko" depending on the outcome of the search
    "message" => "",        // Custom message, ie. use it to notify user if something goes wrong
    "data" => $results      // Array containing the list of results
];

// Return the result back to the requesting device
die(json_encode($responseData));
```


Callbacks
===

This other example showcases the use ```Client::getCallbackData``` method to get data send to a **callback URL** configured to received entries sent from the mobile application :

```php
use TerangaMobile\Client;

$terangaMobileClient = new Client([
    "application_id" => "<REPLACE_WITH_YOUR_APPLICATION_ID>",
    "application_secret" => "<REPLACE_WITH_YOUR_APPLICATION_SECRET>"
]);

$callbackData = $terangaMobileClient->getCallbackData();

// $callbackData is now an array containing all information send by the server

$responseData = [
    "status" => "ok",
    "message" => "Pong from callback"
];

var_dump($responseData);
```

Response format
===
Here is an example output, showing what you can expect from ```getCallbackData``` :

```php
[
    "id" => "264", // ID de la saisie
    "organisation_id" => "1", // ID de l"organisation
    "team_id" => "22", // ID de l'équipe
    "form_id" => "40", // ID de l'enquête
    "collector_id" => "15", // ID de l'enquêteur
    "form_data_version_id" => "3", // Version du formulaire
    "entries" =>  // Liste des réponses
    [
        "uid_question" => "<valeur_de_reponse>", // La réponse idenfiée par le code "uid_question" est "valeur_de_reponse".
        "uid_question" => "<valeur_de_reponse>",
        "uid_question" => "<valeur_de_reponse>",
        ...
    ],
    "location" => "14.6510544,-17.4440369", // coordonnées GPS de la saisie
    "create_date" =>  // date de réception de la saisie
    [
        "date" => "2020-07-03 10:48:53.022157",
        "timezone_type" => "3",
        "timezone" => "Africa/Dakar",
    ],
]
```