<?php
class MY_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        
        $this->load->database();
        $this->output->set_header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
        $this->output->set_header('Pragma: no-cache');
        $this->output->set_header('Content-Type: text/html; charset=UTF-8');
    }
    
    public function index(){
    	
    	return;
    }
    
    public function commonSearch($pageVar){
    	$pageVar['limit'] = 100;
    	$pageVar['pageNo'] = 1;
    	$pageVar['search'] = '';
    	if($this->input->post('pageNo') != null)
    		$pageVar['pageNo'] = $this->input->post('pageNo');
    	if($this->input->post('search') != null)
    		$pageVar['search'] = $this->input->post('search');
    	if($this->input->get('pageNo') != null)
    		$pageVar['pageNo'] = $this->input->get('pageNo');
    	
    	$pageVar['inputs'] = [
    			
    			'pageNo' =>['type'=>'hidden','fielddata'=>['name' => 'pageNo', 'id' => 'pageNo', 'value' => $pageVar['pageNo'],]],
    	
    			'search' =>['type'=>'textfield','label'=>'Search text','fielddata'=>['name' => 'search', 'id' => 'search', 'value' => $pageVar['search'] ,]],
    			];
    			 
    	
    	return $pageVar;
    }

    public function isLoggedIn()
    {
        if($this->session->userdata('username'))
        	return true;
 		else
        	return false;
    }
    
    public function commonTasks()
    {
    	if ($this->isLoggedIn() == false)
        	redirect(base_url() . 'login', 'refresh');
    	else{
    		$userId = $this->session->userdata('userid');
    		$loggedInUserName = $this->session->userdata('loggedInUserName');
    		$userName = $this->session->userdata('username');
    		$data['userId'] = $userId;
    		$data['loggedInUserName'] = $loggedInUserName;
    		$data['userName'] = $userName;
	    	$query = $this->db->get_where("menu", ['parentId' => 0]);
			$data['menu'] = $query->result();
			
			return $data;
    	}
    }
    

    public function commonTasksSite()
    {
    	$query = $this->db->get_where("menu", ['parentId' => 0, 'status'=>1]);
    	$data['menu'] = $query->result();
    				
    	return $data;
    }
}

class MY_RestController extends MY_Controller
{
	var $model;
	public function __construct()
	{
		parent::__construct();
		$this->load->model('my_model');
		$this->model = $this->my_model;
		
		

	}

	public function index(){
		 
		return;
	}
	
	private function checkAuthentication($request){
		if($request == null)
			return false;
		return true;
	}
	
	private function checkAuthorization($request){
		if($request == null)
			return false;
		return true;
	}
	
	/**
	 * All requests should go through this method
	 * 
	 * This method contains authentication and authorization activities.
	 * 
	 * @param string $param
	 */
	public function post($param = ''){
		$response = ["success"=>false];
		$_POST = json_decode(file_get_contents('php://input'), true);
		$request = $this->input->post();
		$isLoggedin = $this->checkAuthentication($request);
		$isAuthorized = $this->checkAuthorization($request);
		$operation = $request['operation'];
		
		if($operation == null){
			//TODO implement operan null case
			;
		}else{
			switch ($operation) {
				case Applicationconst::OPERATION_ADD:
					$response['data'] = $this->add($request);
					$response['success'] = true;
					break;
				case Applicationconst::OPERATION_MODIFY:
					$response['data'] = $this->modify($request);
					$response['success'] = true;
					break;
				case Applicationconst::OPERATION_DELETE:
					$response['data'] = $this->delete($request);
					$response['success'] = true;
					break;
				case Applicationconst::OPERATION_GET:
					$response['data'] = $this->get();
					$response['success'] = true;
					break;
				case Applicationconst::OPERATION_GET_ALL:
					$response['data'] = $this->getAll();
					$response['success'] = true;
					break;
				case Applicationconst::OPERATION_GET_BY_FILTER:
					$response['data'] = $this->getByFilter($request['filter']);
					$response['success'] = true;
					break;
				case Applicationconst::OPERATION_GET_BY_ID:
					$response['data'] = $this->getByFilter(['componentId'=>$request['componentId']]);
					if(count($response['data'])>0)
					$response['data'] = $response['data'][0];
					$response['success'] = true;
					break;
				default:
					$response['success'] = true;
					$response['message'] = 'Invalid operation';
			}
		}
		
		echo json_encode($response);
		return;
	}
	
	/**
	 * Save data
	 * @param unknown $object
	 */
	protected function add($request){
		$object = $this->getSaveableObject($request);
		$object = $this->updateAuditInfo($object);
		return $this->model->save($object);
	}
	
	protected function getSaveableObject($object){
		$operation = $object['operation'];
		//if(isset($object['operation']))
		unset($object['operation']);
		//if(isset($object['loginBean']))
		unset($object['loginBean']);
		unset($object['confirmPassword']);
		
		if($operation == Applicationconst::OPERATION_MODIFY){
			//if(isset($object['componentId']))
			unset($object['componentId']);
		}
		
		
		//$object = $this->updateAuditInfo($object);
		
		return $object;
	}
	
	protected function updateAuditInfo($object){
		$object['createdBy'] =  $this->session->userdata('userid');
		$object['createdDate'] = date("Y-m-d h:i:s");
		return $object;
	}
	
	protected function updateMModifyAuditInfo($object){
		$object['updatedBy'] =  $this->session->userdata('userid');
		$object['updatedDate'] = date("Y-m-d h:i:s");
		return $object;
	}
	/**
	 * Modify data
	 * @param unknown $object
	 */
	protected function modify($request){
		$objectId = $request['componentId'];
		$object = $this->getSaveableObject($request);
		$object = $this->updateMModifyAuditInfo($object);
		
		return $this->model->update($objectId, $object);
	}
	
	/**
	 * delete data
	 * @param unknown $object
	 */
	protected function delete($request){
		$objectId = $request['componentId'];
		return $this->model->delete($objectId);
	}
	
	/**
	 * fetch all data
	 * @param unknown $object
	 */
	protected function getAll(){
		return $this->model->getAll();
	}
	
	/**
	 * fetch data
	 * @param unknown $object
	 */
	protected function get($objectId){
		return $this->model->getById($objectId);
	}
	
	/**
	 * fetch data by filter
	 * @param unknown $object
	 */
	protected function getByFilter($filter){
		return $this->model->getByFilter($filter);
	
	}
	
	
	/*
	public function get($param = ''){
		echo 'Test';
		return;
	}
	
	public function put($param = ''){
		echo 'Test';
		return;
	}
	
	public function delete($param = ''){
		echo 'Test';
		return;
	}
	*/

}