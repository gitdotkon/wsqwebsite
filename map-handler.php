<?php
if(isset($_POST)){
    @include 'TabGeo/country.php';
    function get_country(){
        $ip = $_SERVER['REMOTE_ADDR'];
        $country_code = \TabGeo\country($ip);
        return $country_code;
    }
    define('COUNTRY_CODE', get_country());

    echo json_encode(COUNTRY_CODE);
    die();
}else{
    die();
}