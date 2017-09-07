<?php
class Login extends CI_Controller {
	
	function __construct()
	{
		parent::__construct();
	}

	public function index(){
		if($this->session->userdata('username')!=FALSE){
			redirect(base_url() . 'home/dashboard', 'refresh');
		}
		$data['title'] = ucfirst('login'); // Capitalize the first letter
		$data['errormsg'] = '';		
		$this->load->view('login.php', $data);
	}
	
	public function four_zero_four(){
		$data['title'] = '404';
		$this->load->view('404.php', $data);
	}
	
	public function authenticate(){
	
		$data['title'] = ucfirst('login'); // Capitalize the first letter
		$data['errormsg'] = '';
		
		$password = $this->input->post('password');
		$username = $this->input->post('username');
		$ret = $this->login($username, $password);				
		if($ret==false){
			$data['title'] = ucfirst('login'); // Capitalize the first letter
			$data['errormsg'] = 'Invalid userid / password.';
			$this->load->view('login.php', $data);
		}else{
			redirect(base_url() . 'home/dashboard', 'refresh');
		}
	}
	
	private function Login($username, $password)
	{
		$ret = $this->validateUser($username, $password);
		if(isset($ret))
		{
			$this->session->set_userdata('username', $username);
			$this->session->set_userdata('userid', $ret->componentId);						$this->session->set_userdata('loggedInUserName', $ret->name);						$logdata = array('userId'=>$ret->componentId, 'operation'=>Applicationconst::OPERATION_LOGIN);						$this->db->insert('activitylog', $logdata);
	
			return true;
		}
	
		return false;
	}
	
	public function logout(){
				$userId = $this->session->userdata('userid');
		$this->session->sess_destroy();
		$logdata = array('userId'=>$userId, 'operation'=>Applicationconst::OPERATION_LOGOUT);					$this->db->insert('activitylog', $logdata);
		redirect(base_url() . 'login', 'refresh');
	}
	
	private function validateUser($username, $password)
	{
		$query = $this->db->query("SELECT * FROM user WHERE username = '$username'");		
		foreach ($query->result() as $row)
		{	
			if($row->password == md5($password)){
		    	return $row;
			}
		}
		
		return null;
	}
	
}