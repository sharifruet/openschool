<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/*	
 *	@author : Sharif Uddin
 *	date	: April 01, 2016
 */

class Article extends MY_RestController
{
    function __construct()
    {
        parent::__construct();
        
        $this->load->model('articlemodel');
        $this->model = $this->articlemodel;
    }

	
}
