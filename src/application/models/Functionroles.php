<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Functionrolesmodel extends MY_Model {
	
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
        $this->tableName = 'functionroles';
    }
    
    public function getRolefynctions($roleId){
    	$ret = $this->db->get_where($this->tableName, ['roleId'=>$roleId])->result();
    	if(count($ret) > 0 )
    		$ret = $ret[0];
    	return $ret;
    }

}
?>