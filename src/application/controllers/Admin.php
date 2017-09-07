<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/*	
 *	@author : Sharif Uddin
 *	date	: April 01, 2016
 */ 
 /* test comment for git */  

class Admin extends MY_Controller
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
    
    public function page()
    {
    	$this->load->view('ang/index.html');
    }
    
    
    
}
