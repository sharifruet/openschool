<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Articlemodel extends MY_Model {
	
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
        $this->tableName = 'articles';
    }
    
    
    public function save($data){
    	$tags = $data['tags'];
    	unset($data['tags']);
    	$id = parent::save($data);
    	$this->updateTags($id, $tags);
    	return $id;
    	
    }
    
    public function update($id, $data){
    	$tags = $data['tags'];
    	unset($data['tags']);
    	$insId = parent::update($id, $data);
    	$this->updateTags($id, $tags);
    	return $insId;
    	
    }
    public function getById($id){
    	$ret = parent::getById($id);
    	$ret->tags = array();
    	$this->load->model('menumodel');
    	
    	$tgs = $this->db->get_where('tags', ['object'=>$this->tableName,  'objectId'=>$id])->result();
    	foreach ($tgs as $t){
    		$data = $this->menumodel->getById($t->menuId);
    		array_push($ret->tags, $data);
    	}
    	
    	return $ret;
    }
    
    public function getByFilter($cond, $limit = MY_Model::LIMIT, $offset=MY_Model::OFFSET, $orderBy='componentId', $orderType='ASC'){
    	//$ret = $this->db->get_where($this->tableName, $cond)->result();
    	$ret = parent::getByFilter($cond, $limit, $offset, $orderBy, $orderType);
    	$fret = array();
    	foreach ($ret as $obj){
    		$foo = (array)$obj;
    		$foo['tags'] = array();
    		$obj= (object)$foo;
    		
    		$this->load->model('menumodel');
    		
    		$tgs = $this->db->get_where('tags', ['object'=>$this->tableName,  'objectId'=>$obj->componentId])->result();
    		foreach ($tgs as $t){
    			$data = $this->menumodel->getById($t->menuId);
    			array_push($obj->tags, $data);
    		}
    		
    		array_push($fret,$obj);
    	}
    	
    	return $fret;
    }
    
    private function updateTags($questionId, $tags){
    	$previousTags = $this->db->get_where('tags', ['object'=>$this->tableName,  'objectId'=>$questionId])->result();
    	foreach ($previousTags as $t1){
    		$found = false;
    		foreach ($tags as $t2){
    			if($t1->objectId == $t2['componentId'])
    				$found = true;
    		}
    		
    		if($found == false){
    			$this->db->where('componentId', $t1->componentId);
    			return $this->db->delete('tags');
    		}
    	}
    	
    	foreach ($tags as $t2){
    		$found = false;
    		foreach ($previousTags as $t1){
    			if($t1->objectId ==$t2['componentId'])
    				$found = true;
    		}
    		
    		if($found == false){
    			$this->db->insert('tags', ['object'=>$this->tableName,"objectId"=>$questionId, "menuId"=>$t2['componentId']]);
    		}
    		
    	}
    }

}
?>
