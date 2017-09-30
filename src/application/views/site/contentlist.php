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
			<?php
		$cnt = 0;
		foreach ($article as $ar):
		$cnt++;
		?>
		<div class="row">
			<div class="col-md-1">
				<div style="font-size: x-large;color: gray;"><?php echo $cnt;?></div>
			</div>
			<div class="col-md-11">
				<p> <a href="/d/ar/<?php echo $ar->componentId;?>/<?php echo substr($ar->title,0,100);?>"><?php echo $ar->title;?></a>
				</p>
				<p style="text-align: right;"><?php echo $ar->leadtext;?></p>
			</div>
		</div>
		<?php endforeach;?>
		<hr/>
		<?php
		$cnt = 0;
		foreach ($questionanswer as $qa):
		$cnt++;
		?>
		<div class="row">
			<div class="col-md-1">
				<div style="font-size: x-large;color: gray;"><?php echo $cnt;?></div>
			</div>
			<div class="col-md-11">
				<p>প্রশ্নঃ <a href="/d/qu/<?php echo $qa->componentId;?>/<?php echo substr($qa->question,0,100);?>"><?php echo $qa->question;?></a>
				</p>
				<p style="text-align: right;">
				উত্তরঃ  <?php echo $qa->answer;?></p>
			</div>
		</div>
		<?php endforeach;?>
		<hr/>
		
		<?php
		$cnt = 0;
		foreach ($mcq as $qa):
		$cnt++;
		?>
		<div class="row">
			<div class="col-md-1">
				<div style="font-size: x-large;color: gray;"><?php echo $cnt;?></div>
			</div>
			<div class="col-md-11">
				<p>প্রশ্নঃ <a href="/d/mc/<?php echo $qa->componentId;?>/<?php echo substr($qa->question,0,100);?>"><?php echo $qa->question;?></a>
				</p>
				<div class="row"> 
					<div class="col-md-6">A. <?php echo $qa->optiona;?></div>
					<div class="col-md-6">B. <?php echo $qa->optionb;?></div>
				</div>
				<div class="row"> 
					<div class="col-md-6">C. <?php echo $qa->optionc;?></div>
					<div class="col-md-6">D. <?php echo $qa->optiond;?></div>
				</div>
				<div class="row"> 
					<div class="col-md-6">
						উত্তরঃ  <?php echo $qa->answer;?></p>
					</div>
				</div>
			</div>
		</div>
		<?php endforeach;?>
		
		<?php require 'ads/os_resp.php';?>
	</div>

 </div>
</div>
</div>
