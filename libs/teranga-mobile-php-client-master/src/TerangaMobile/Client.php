<?php

namespace TerangaMobile;

use Exception;

class Client extends \Core\BaseClient {

    const API_BASE_PATH = 'http://teranga-mobile.pasteur.sn/api/v1/';

    protected $callback_data = null;

    /**
     * When a search field is edited from the mobile application, user input and field uid are package and sent here in a special format.
     * Use this method to access the UID of the field, useful when actually performing the search
     */
    function getSearchFieldUid(){
        return $this->get_post_field("field_uid");
    }

    /**
     * When a search field is edited from the mobile application, user input and field uid are package and sent here in a special format.
     * Use this method to access the input query, required when actually performing the search
     */
    function getSearchFieldQuery(){
        return $this->get_post_field("query");
    }

    /**
     * When a callback URL is called by server, data is packaged and sent here in a special format.
     * Use this method to easily access and process it
     * 
     * @param array|null $config Use this argument to modify the way data is sent back. $config['flatten'] to "flatten" the array, $config['extract_entries'] to extract entries (only valid field names are extracted)
     */
    function getCallbackData($config = []){
        if(!is_null($this->callback_data))
            return $this->callback_data;

        $this->callback_data = $this->get_post();

        if(isset($config['flatten'])){
            $this->callback_data = array_merge(
                $this->callback_data,
                $this->callback_data["entries"]
            );

            unset($this->callback_data["entries"]);
        }

        if(isset($config['extract_entries'])){
            if(isset($config['flatten'])){
                throw new Exception("Data has already been flattened, can't extract");
            }
            extract($this->callback_data["entries"], $config['extract_type'] ?? EXTR_SKIP);
        }

        return $this->callback_data;
    }
}