<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/*	
 *	@author : Sharif Uddin
 *	date	: April 01, 2016
 */

class Questionanswer extends MY_RestController
{
    function __construct()
    {
        parent::__construct();
        
        $this->load->model('questionanswermodel');
        $this->model = $this->questionanswermodel;
    }

	
}
