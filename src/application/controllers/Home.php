<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/*	
 *	@author : Sharif Uddin
 *	date	: April 01, 2016
 */ 
 /* test comment for git */  

class Home extends MY_Controller
{
    function __construct()
    {
    	
        parent::__construct();
        $this->load->model('crudmodel');
		
    }
    
    /***default functin, redirects to login page if no admin logged in yet***/
    public function index()
    {
        //commonTasks();
        redirect(base_url() . 'admin/dashboard', 'refresh');
    }
    
    public function dashboard()
    {
    	$data = $this->commonTasks();
    	$data['page_title'] = 'Dashboard';
    	$data['page_name'] = 'home';
    	 // Capitalize the first letter
    	//return;
		$this->load->view('home/dashboard/index', $data);
    }
    
    public function menu($operation = 'get', $menuId = -1)
    {
    	$data = $this->commonTasks();
    	
    	$data['parentId'] = 0;
    	if($this->session->userdata('menuParentId'))
    		$data['parentId'] = $this->session->userdata('menuParentId');
    	
    	if($operation == 'save'){
    		$dtts = array();
    		$dtts['name'] = $this->input->post('name');
    		$dtts['displayName'] = $this->input->post('displayName');
    		$dtts['isEnd'] = $this->input->post('isEnd');
    		$dtts['parentId'] = $this->input->post('parentId');
    		$data['parentId']= $this->input->post('parentId');
    		$dtts['name'] = htmlentities(str_replace(' ', '_', $dtts['name']));
    		
    		if($menuId > 0){
    			$this->db->where('componentId', $menuId);
    			$this->db->update('menu', $dtts);
    		}else{
    		
    			$this->db->insert('menu', $dtts);
    		}
    		$this->session->set_flashdata('flash_message' , 'Save successful!!!');
    		
    		redirect(base_url() . 'home/menu', 'refresh');
    		
    	}else if($operation == 'delete'){
    		 
    		$this->db->delete('menu',['componentId'=>$menuId]);
    		$this->session->set_flashdata('flash_message' , 'Delete successful!!!');
    		 
    		redirect(base_url() . 'home/menu', 'refresh');
    	}else if($operation == 'search'){
    		 
    		$data['parentId'] = $this->input->post('parentId');
    	}
    	
    	$selectedMenu = null;
    	if($menuId > 0){
    		$menues = $this->db->get_where('menu',['componentId'=>$menuId])->result();
    		if(count($menues)>0){
    			$selectedMenu = $menues[0];
    		}
    	}
    	
    	$data['selectedMenu'] = $selectedMenu;
    	
    	$groupMenu = $this->db->get_where('menu', ['isEnd'=>0])->result();
    	
    	$data['groupMenu'] = $groupMenu;
    	
    	$this->session->set_userdata('menuParentId', $data['parentId']);
    	
    	$hrchyCnd = $data['parentId']==0?'%':"%-".$data['parentId']."-%";
    	
    	$allMenu = $this->db->get_where('menu', "hierarchyPath LIKE '" . $hrchyCnd . "' ")->result();
    	 
    	$data['allMenu'] = $allMenu;
    	
    	$data['page_title'] = 'OpenSchool Menu';
    	$data['page_name'] = 'Manage menu';
    	
    	$this->load->view('home/menu/index', $data);
    }
    
    
    public function exam($examId, $operation='get', $objectId=-1)
    {
    	$data = $this->commonTasks();
    	$data['examId'] = $examId;
    	$exam = $this->db->get_where('menu', ['componentId'=>$examId])->result();
    	
    	if($operation == 'save'){
    		$dtts['question'] = $this->input->post('question');
    		$dtts['answer'] = $this->input->post('answer');
    		$dtts['typeId'] = $examId;
   			
    		if($objectId > 0){
    			$this->db->where('componentId', $objectId);
    			$this->db->update('questionanswer', $dtts);
    		}else{
    			$this->db->insert('questionanswer',$dtts);
    		}
    		$this->session->set_flashdata('flash_message' , 'Save successful!!!');
    		
    		redirect(base_url() . 'home/exam/'.$examId, 'refresh');
    		
    	}else if($operation == 'delete'){
    	
    		$this->db->delete('questionanswer',['componentId'=>$objectId]);
    		$this->session->set_flashdata('flash_message' , 'Delete successful!!!');
    	
    		redirect(base_url() . 'home/exam/'.$examId, 'refresh');
    	}
    	
    	
    	if($exam != null && count($exam)>0){
    		
    		$cnt = 0;
    		$data['hierarchy'][$cnt++] = $exam[0];
    		$e = $exam[0];
    		
    		while ($e->parentId != 0 ){
    			$exm = $this->db->get_where('menu', ['componentId'=>$e->parentId ])->result();
    			if(count($exm)>0){
    				$data['hierarchy'][$cnt++] = $exm[0];
    				$e = $exm[0];
    			}else{
    				break;
    			}
    		}
    		
    		if($exam[0]->isEnd == 1){
    			$data['end'] = true;
    			$this->db->from('questionanswer');
    			$this->db->order_by("componentId", "desc");
    			$this->db->where('typeId',$examId);
    			$query = $this->db->get();
    			
    			$data['records'] = $query->result();
    			
    		}else{
    			$data['end'] = false;
    			$subMenu = $this->db->get_where('menu', ['parentId'=>$examId])->result();
    		
    			$data['subMenu'] = $subMenu;
    		}
    	}else{
    		echo 'ERROR'.$examId;
    	}
    	
    	$question = null;
    	if($objectId > 0){
    		$questions = $this->db->get_where('questionanswer',['componentId'=>$objectId])->result();
    		if(count($questions)>0){
    			$question = $questions[0];
    		}
    	}
    	
    	$data['question'] = $question;
    	
    	$data['page_title'] = 'Dashboard';
    	$data['page_name'] = 'home';
    	// Capitalize the first letter
    	//return;
    	$this->load->view('home/exam/index', $data);
    }
    
    public function about(){
    	$data = $this->commonTasksSite();
    	$data['page_title'] = 'OpenSchool';
    	$data['page_name'] = 'About';
    	$this->load->view('home/about/index', $data);
    }
    
    public function contact(){
    	$data = $this->commonTasksSite();
    	$data['page_title'] = 'OpenSchool';
    	$data['page_name'] = 'Contact';
    	$this->load->view('home/contact/index', $data);
    }
    
    public function object($operation='get', $objectNamw=''){
    	$data = $this->commonTasks();
		$data['datatypes'] = $this->db->get('datatype')->result();
		
		if($operation == 'save'){
			$obj['uniqueCode'] = $this->input->post('name');
			$obj['displayName'] = $this->input->post('displayName');
			//$this->db->insert('object', $obj);
			//$insert_id = $this->db->insert_id();
			
			$fieldCount = $this->input->post('fieldCount');
			$fields = array();
			for($i=1;$i<=$fieldCount;$i++){
				//$fields[$i]['objectId'] = $insert_id;
				$fields[$i]['fieldName'] = $this->input->post('field'.$i);
				$fields[$i]['datatypeId'] = $this->input->post('type'.$i);
			}
			
		
			$this->crudmodel->saveObject($obj, $fields);
			
			$this->session->set_flashdata('flash_message' , 'Save successful!!!');
			 
			redirect(base_url() . 'home/object', 'refresh');
		}if($operation == 'delete'){
			$this->crudmodel->deleteObject($objectNamw);
			$this->session->set_flashdata('flash_message' , 'Delete successful!!!');
			
			redirect(base_url() . 'home/object', 'refresh');
		}
		
		$data['objects'] = $this->crudmodel->getObjects();
		
    	$data['page_title'] = 'Object';
    	$data['page_name'] = 'Manage Object';
    	$this->load->view('home/object/index', $data);
    	
    }
    
    
    public function record($objectName = "", $operation = '', $recordId = -1){
    	$data = $this->commonTasks();
    	
    	$data['datatypes'] = $this->db->get('datatype')->result();
    	$data['tags'] = $this->crudmodel->getMenu();
    	
    	if($objectName==""){
    		echo 'NO Object selected';
    		return;
    	}
    	
    	$data['object'] = $this->crudmodel->getObjectByName($objectName);
    	
    	if($data['object'] == null){
    		echo 'Invalid Object';
    		
    		return;
    	}
    	
    	if($operation == 'save'){
    		$vals = array();
    		foreach ($data['object']['fields'] as $field){
    			$vals[$field->componentId] = $this->input->post('FLD'.$field->componentId);
    		}
    		
    		$this->crudmodel->saveValues($objectName, $vals);
    		
    		$this->session->set_flashdata('flash_message' , 'Save successful!!!');
    		redirect(base_url() . 'home/record/'.$objectName, 'refresh');
    		
    		return;
    	}else if($operation == 'delete'){
    	
    		$this->crudmodel->deleteRecord($recordId);
    	
    		$this->session->set_flashdata('flash_message' , 'Delete successful!!!');
    		redirect(base_url() . 'home/record/'.$objectName, 'refresh');
    	
    		return;
    	}else if($operation == 'update'){
    		
    		$fieldName = $this->input->post('fieldName');
    		$fieldId = $this->input->post('fieldId');
    		$recordId = $this->input->post('recordId');
    		
    		$this->crudmodel->updateValues($recordId, $fieldId, $fieldName);
    		
    		$this->session->set_flashdata('flash_message' , 'Save successful!!!');
    		redirect(base_url() . 'home/record/'.$objectName, 'refresh');
    		
    		return;
    	}
    	
    	$data['records'] = $this->crudmodel->get($objectName);
    	
    	$data['page_title'] = 'Object';
    	$data['page_name'] = 'Manage Object';
    	$this->load->view('home/objectValue/index', $data);
    	
    	return;
    }
    
    public function add($operation=''){
    	$data = $this->commonTasks();
    	$data['dts'] = array();
    	
    	if($operation=='save'){
    		
    		$dts['question'] = $this->input->post('question');
    		$dts['optiona'] = $this->input->post('optiona');
    		$dts['optionb'] = $this->input->post('optionb');
    		$dts['optionc'] = $this->input->post('optionc');
    		$dts['optiond'] = $this->input->post('optiond');
    		$dts['answer'] = $this->input->post('answer');	
    		
    		if($this->db->insert('mcq', $dts))
    		{
    			$this->session->set_flashdata('flash_message' , 'Save successful!!!');
    			redirect(base_url() . 'home/add', 'refresh');
    		}else{
    			$data['dts'] = $dts;
    			$this->session->set_flashdata('flash_message' , 'Save failed!!!');
    		}
    	}
    	
    	$data['questions'] = $this->db->get('mcq')->result();
   -
    	$data['page_title'] = 'Object';
    	$data['page_name'] = 'Manage Object';
    	$this->load->view('home/add/index', $data);
    	
    	return;
    }
    
    
}
