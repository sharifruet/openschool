<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Responsemodel extends CI_Model {
	
	public static $SUCCESS = "success";
	public static $FAILED = "failed";
	
	public $message = '';
	public $data = [];

}
?>