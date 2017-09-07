<?php 
class vdatamodel extends CI_Model {
	
	public $serialNo; 
	public $recordId;
	public $fieldId;
	public $fieldName;
	public $integerValue;
	public $smallStringValue;
	public $floatValue; 
	public $longStringValue; 
	public $dateValue;
	public $objectName;
	
	private $tableName = "vdata";
	

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
    public function getAll() {
    	$query = $this->db->get($this->tableName);
    	return $query->result();
    }
}