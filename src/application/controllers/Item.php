<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/*	
 *	@author : Sharif Uddin
 *	date	: April 01, 2016
 */ 
 /* test comment for git */  

class Item extends MY_RestController
{
    function __construct()
    {
        parent::__construct();
        
        $this->load->model('itemmodel');
        $this->model = $this->itemmodel;
    }

	
}
