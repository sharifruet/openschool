<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Model extends CI_Model {
	const LIMIT = 50;
	const OFFSET = 0;
	
    function __construct()
    {
    	// Call the Model constructor
    	parent::__construct();
    }
    
    public function getAll(){
    	return $this->db->get($this->tableName)->result();
    }
    
    public function getById($id){
    	$ret = $this->db->get_where($this->tableName, ['componentId'=>$id])->result();
    	if(count($ret) > 0 )
    		$ret = $ret[0];
    	return $ret;
    }
    
    public function getByFilter($cond, $limit = LIMIT, $offset=OFFSET, $orderBy='componentId', $orderType='ASC'){
    	$qry = $this->db->order_by($orderBy, $orderType);
    	$ret = $qry->get_where($this->tableName, $cond, $limit, $offset)->result();
  
    	return $ret;
    }
    
    public function countByFilter($cond){
    	$ret = $this->db->get_where($this->tableName, $cond)->result();
    	
    	$this->db->select('COUNT(*) as total');
    	$this->db->where($cond);
    	$res = $this->db->get($this->tableName)->result();
    	$ret = 0;
    	if(count($res) > 0)
    		$ret = $res[0]->total;
    	return $ret;
    }
    
    
    public function update($id, $data){
    
    	$this->db->where('componentId', $id);
    	return $this->db->update($this->tableName, $data);
    
    }
    
    public function delete($id){
    	$this->db->where('componentId', $id);
    	return $this->db->delete($this->tableName);
    
    }
    
    public function save($data){
    
    	$this->db->insert($this->tableName, $data);
    	
    	return $this->db->insert_id();
    
    }
    
    public function getByTag($tagId){
    	//echo $tagId;
    	$this->db->select($this->tableName.'.*');
    	$this->db->from($this->tableName);
    	$this->db->join('tags', $this->tableName.".componentId = tags.objectId AND tags.object='".$this->tableName."' AND tags.menuId = ".$tagId);
    	$query = $this->db->get();
    	$ret = $query->result();
    	/*
    	$ret = $this->db->get_where($this->tableName, $cond)->result();
    	
    	$this->db->select('COUNT(*) as total');
    	$this->db->where($cond);
    	$res = $this->db->get($this->tableName)->result();
    	$ret = 0;
    	if(count($res) > 0)
    		$ret = $res[0]->total;
    		return $ret;
    		
    		*/
    	return $ret;
    }
    
    
}?>