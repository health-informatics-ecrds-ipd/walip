<?php

namespace Core;

class BaseClient {
    const API_BASE_PATH = ""; //

    protected $config = [];
    protected $errorMessage = "";
    protected $JSONInput = null;

    function __construct($config = []){
        $this->config = array_merge(
            // Defaults
            [
                'enable_https' => false,
                'verbose' => false
            ],
            $config
        );
    }

    function baseUrl($path){
        $base = $this->config['enable_https'] ? preg_replace("#^http\:\/\/#", "https://", static::API_BASE_PATH) : static::API_BASE_PATH;
        return $base.$path;
    }

    function executePost($path, $postData){
        $ch = curl_init($this->baseUrl($path));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        if($this->config['verbose'])
            curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_FAILONERROR, true);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            $this->errorMessage = curl_error($ch);
        }

        curl_close($ch);
        
        if($response && strlen($response))
            return json_encode($response, true);

        return FALSE;
    }

    function get_post(){
        if($_POST)
            return $_POST;
        
        $input = $this->getJSONInputStream();
        return $input ?? [];
    }

    function get_post_field($key){
        if(isset($_POST[$key]))
            return $_POST[$key];
        
        $input = $this->getJSONInputStream();
        return $input[$key] ?? FALSE;
    }
    
    function getJSONInputStream(){
        if(is_null($this->JSONInput))
            $this->JSONInput = json_decode(file_get_contents('php://input'), true);

        return $this->JSONInput;
    }

    function getErrorMessage(){
        return $this->errorMessage;
    }
}