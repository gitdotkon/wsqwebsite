<?php
define ( 'DOCUMENT_ROOT', dirname ( __FILE__ ) );
define("img_dir", DOCUMENT_ROOT."/images/captcha/");
include("random.php");
$captcha = generate_code();
// use session
// session_start();
// $_SESSION['captcha']=$captcha;
// session_destroy();

$cookie = md5($captcha);
//$cookie = $captcha;
$cookietime = time()+1200;
setcookie("captcha", $cookie, $cookietime);

function img_code($code){
    header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s", 10000) . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    header("Content-Type:image/png");
    $img_arr = array(
        "bg.png"
    );
    $font_arr = array();
    $font_arr[0]["fname"] = "captcha-font.ttf";
    $font_arr[0]["size"] = rand(20, 30);

    $n = 0;
    $img_fn = $img_arr[rand(0, sizeof($img_arr)-1)];
    $im = imagecreatefrompng (img_dir . $img_fn);

    $color = imagecolorallocate($im, rand(0, 200), 0, rand(0, 200));

    $x = rand(0, 35);
    for($i = 0; $i < strlen($code); $i++) {
        $x+=15;
        $letter=substr($code, $i, 1);
        $color = imagecolorallocate($im, rand(0, 200), 0, rand(0, 200));
        imagettftext($im, $font_arr[$n]["size"], rand(2, 4), $x, rand(40, 42), $color, img_dir.$font_arr[$n]["fname"], $letter);
    }
    imagepng($im);
    imagedestroy($im);
}
img_code($captcha);
