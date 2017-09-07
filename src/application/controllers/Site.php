<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Site extends MY_Controller {
	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('articlemodel');
		$this->load->model('mcqmodel');
		$this->load->model('questionanswermodel');
		
	}

	public function index()
	{
		$data = $this->commonTasksSite();
		$data['catdata'] = array();
		foreach ($data['menu'] as $m){
			$this->db->select('questionanswer.*');
			$this->db->from('menu');
			$this->db->join('questionanswer', 'menu.componentId = questionanswer.typeId');
			$this->db->like(['menu.hierarchyPath'=>'-'.$m->componentId.'-']);
			$this->db->order_by('rand()');
			$this->db->limit(6);
			$qry = $this->db->get();
			$data['catdata'][$m->componentId] = $qry->result();
			
			//print_r($data['catdata'][$m->componentId]);
		}
		
		$this->load->model('articlemodel');
		$data['articles'] = $this->articlemodel->getByFilter(['type'=>'NEWS'],2,0,'componentId','DESC');
		
		$this->load->view('templates/siteheader', $data);
		$this->load->view('site/index', $data);
		$this->load->view('templates/footer', $data);
		
	}
	
	public function category($cat = '')
	{
		$cat = urldecode($cat);
		
		$data = $this->commonTasksSite();
		
		
		$result = $this->db->get_where('menu', ['name'=>$cat])->result();

		$selectCat = $result[0];
		
		$data['catdata'] = array();
		$data['contentlist'] = array();
		
		if($selectCat->isEnd==0){
			$data['catdata'] = $this->db->get_where('menu', ['parentId'=>$selectCat->componentId])->result();
			
			
		}else{
			//$this->load->model('articlemodel');
			$data['article'] = $this->articlemodel->getByTag($selectCat->componentId);
			
			//$this->load->model('questionanswermodel');
			$data['questionanswer'] = $this->questionanswermodel->getByTag($selectCat->componentId);
			
			//$this->load->model('mcqmodel');
			$data['mcq'] = $this->mcqmodel->getByTag($selectCat->componentId);
			
			//$tags =  $this->db->get_where('tags', ['parentId'=>$selectCat->parentId])->result();
			$data['catdata'] = $this->db->get_where('menu', ['parentId'=>$selectCat->parentId])->result();
			$data['contentlist'] = $this->db->get_where('questionanswer',['typeId'=>$selectCat->componentId])->result();
		}
		
		
		$cnt = 0;
		$data['hierarchy'][$cnt++] = $selectCat;
		$e = $selectCat;
		
		while ($e->parentId != 0 ){
			$exm = $this->db->get_where('menu', ['componentId'=>$e->parentId ])->result();
			if(count($exm)>0){
				$data['hierarchy'][$cnt++] = $exm[0];
				$e = $exm[0];
			}else{
				break;
			}
		}
		
		 
		$data['category'] = $selectCat;

		$data['pageTitle'] = $selectCat->displayName;
		$data['pageSubtitle'] = $selectCat->displayName;
		
		$this->load->view('templates/siteheader', $data);
		if($selectCat->isEnd==0)
			$this->load->view('site/category', $data);
		else
			$this->load->view('site/contentlist', $data);
		$this->load->view('templates/footer', $data);
	
	}
	
	public function detail($type='qu', $id= -1, $title='111')
	{
		$cat = '2';
		//echo $type."-<br/>";
		//echo $id."-<br/>";
		//echo $title."-<br/>";
		$cat = urldecode($cat);
	
		$data = $this->commonTasksSite();
		$result = [];
		
		if($type=='qu'){
			$data['qucontent']= $this->questionanswermodel->getById($id);
		}elseif ($type=='ar'){
			$data['arcontent']= $this->articlemodel->getById($id);
		}elseif ($type=='mc'){
			$data['mccontent']= $this->mcqmodel->getById($id);
		}
	
		$result = $this->db->get_where('questionanswer',['componentId'=>$id])->result();
		
		$data['content'] = null;
		if(count($result)){
			$data['content'] = $result[0];
			
			$cat = $result[0]->typeId;
		}
		
		
		//echo $cat;
		$result = $this->db->get_where('menu', ['componentId'=>$cat])->result();
	
		$selectCat = $result[0];
	
		$data['catdata'] = array();
		$data['contentlist'] = array();
	/*
		if($selectCat->isEnd==0){
			$data['catdata'] = $this->db->get_where('menu', ['parentId'=>$selectCat->componentId])->result();
				
				
		}else{
			$data['contentlist'] = $this->db->get_where('questionanswer',['typeId'=>$selectCat->componentId])->result();
		}
	
	*/
		$cnt = 0;
		$data['hierarchy'][$cnt++] = $selectCat;
		$e = $selectCat;
	
		while ($e->parentId != 0 ){
			$exm = $this->db->get_where('menu', ['componentId'=>$e->parentId ])->result();
			if(count($exm)>0){
				$data['hierarchy'][$cnt++] = $exm[0];
				$e = $exm[0];
			}else{
				break;
			}
		}
	
			
	
		$data['pageTitle'] = $selectCat->displayName;
		$data['pageSubtitle'] = $selectCat->displayName;
	
		$this->load->view('templates/siteheader', $data);
		
		$this->load->view('site/content', $data);
		$this->load->view('templates/footer', $data);
	
	}
	
	public function crawl($pos = 180){
		
		echo '<h1>'.$pos.'</h1>';
		echo '<div style ="font-size:x-large;">';
		echo '<a href="../crawl/'.($pos-1).'"> Prev </a> | <a  href="../crawl/'.($pos+1).'"> Next</a>';
		echo '</div>';
		echo '<div>';
		$data = file_get_contents('http://helpline25.wapka.mobi/forum2_theme_112398810.xhtml?n=0&tema='.$pos);
		$p1 = strpos($data, "name=\"hking\"");
		$p2 = strpos($data,"</div>",$p1);
		$p1 += 13;
		$crawled =  substr($data,$p1,$p2 - $p1);
		
		
		echo $crawled;
		echo '</div>';
		return;
	}
}
