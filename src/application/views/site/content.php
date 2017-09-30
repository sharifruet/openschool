<div class="container">
<div class="row">
  <div class="col-sm-3">
    <div class="sidebar-nav">
      <div class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <span class="visible-xs navbar-brand">
          <?php
          if(count($hierarchy)>0){
		    	$h = $hierarchy[0];
		    ?>
		  	<span class="breadcrumb-item active"><?php echo $h->displayName;?></span>
		  <?php }else{?>
		  Side bar
		  <?php }?>
          </span>
        </div>
        <div class="navbar-collapse collapse sidebar-navbar-collapse">
          <ul class="nav navbar-nav">
            <?php foreach ($catdata as $m):?> 
  			<li><a href="<?php echo base_url().'category/'.$m->name;?>"><?php echo $m->displayName;?> </a></li>
  			<?php endforeach;?>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>
  </div>
  <div class="col-sm-9">
		<?php require 'ads/os_resp.php';?>
		<?php if(isset($qucontent)){?>
		<div class="row">
			<div class="col-lg-6">
				<h4>প্রশ্ন | Question</h4>
			</div>
			<div class="col-lg-6"> &nbsp; </div>
		</div>
		
		<div class="row">
			<div class="col-lg-2">&nbsp;
			</div>
			<div class="col-lg-10">
				<h3><?php echo $qucontent->question;?></h3>
			</div>
		</div>
		
		<div class="row">
			<div class="col-lg-6">
				<h4> উত্তর | Answer</h4>
			</div>
			<div class="col-lg-6"> &nbsp; </div>
		</div>
		
		<div class="row">
			<div class="col-lg-2">&nbsp;
			</div>
			<div class="col-lg-10">
				<h3><?php echo $qucontent->answer;?></h3>
			</div>
		</div>
		<?php } else  if(isset($mccontent)){?>
		<div class="row">
			<div class="col-lg-6">
				<h4>প্রশ্ন | Question</h4>
			</div>
			<div class="col-lg-6"> &nbsp; </div>
		</div>
		
		<div class="row">
			<div class="col-lg-2">&nbsp;
			</div>
			<div class="col-lg-10">
				<h3><?php echo $mccontent->question;?></h3>
				<h4><input type="radio" onclick="showAns(<?php echo $mccontent->componentId;?>, <?php echo $mccontent->answer=='A'?"'correct'":"'incorrect'";?>);" name="<?php echo $mccontent->componentId;?>"/> a. <?php echo $mccontent->optiona;?></h4>
				<h4><input type="radio" onclick="showAns(<?php echo $mccontent->componentId;?>, <?php echo $mccontent->answer=='B'?"'correct'":"'incorrect'";?>);" name="<?php echo $mccontent->componentId;?>"/> b. <?php echo $mccontent->optionb;?></h4>
				<h4><input type="radio" onclick="showAns(<?php echo $mccontent->componentId;?>, <?php echo $mccontent->answer=='C'?"'correct'":"'incorrect'";?>);" name="<?php echo $mccontent->componentId;?>"/> c.  <?php echo $mccontent->optionc;?></h4>
				<h4><input type="radio" onclick="showAns(<?php echo $mccontent->componentId;?>, <?php echo $mccontent->answer=='D'?"'correct'":"'incorrect'";?>);" name="<?php echo $mccontent->componentId;?>"/> d. <?php echo $mccontent->optiond;?></h4>
			</div>
		</div>
		
		<div class="row">
			<div class="col-lg-6">
				<h4> উত্তর | Answer</h4>
			</div>
			<div class="col-lg-6"> &nbsp; </div>
		</div>
		
		<div class="row">
			<div class="col-lg-2">&nbsp;
			</div>
			<div class="col-lg-10">
				<h3 id="choose-<?php echo $mccontent->componentId;?>" style="color:yellow;">Choose one</h3>
				<h3 id="correct-<?php echo $mccontent->componentId;?>" style="display: none;color:green;"> ✔ Correct</h3>
				<h3 id="incorrect-<?php echo $mccontent->componentId;?>" style="display: none;color:red;"> ✘  Incorrect</h3>
			</div>
		</div>
		<?php } else  if(isset($arcontent)){?>
		<div class="row">
			<div class="col-lg-12">
				<h3><?php echo $arcontent->title;?></h3>
				<h4><?php echo $arcontent->subtitle;?></h4>
				<p><?php echo $arcontent->leadtext;?></p>
				<p><?php echo $arcontent->content;?></p>
			</div>
			
			<?php require 'ads/os_resp.php';?>
		</div>

		<?php }?>
		
		<div class="row">
			<div class="col-md-12"> 
				<!-- begin wwww.htmlcommentbox.com -->
				 <div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">HTML Comment Box</a> is loading comments...</div>
				 <link rel="stylesheet" type="text/css" href="//www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" />
				 <script type="text/javascript" id="hcb"> /*<!--*/ if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="//www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%246DxNt7WdRbSAxcJKHPQdL%2F"+"&opts=16862&num=10&ts=1493523387254");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})(); /*-->*/ </script>
				<!-- end www.htmlcommentbox.com -->
			</div>
		</div>
	</div>

 </div>
</div>
</div>

<script type="text/javascript">
	function showAns(qid, opt){
		document.getElementById('correct-'+qid).style.display='none';
		document.getElementById('incorrect-'+qid).style.display='none';
		document.getElementById('choose-'+qid).style.display='none';
		document.getElementById(opt+'-'+qid).style.display='';
	}
</script>