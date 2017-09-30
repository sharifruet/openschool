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
		<?php require_once 'ads/os_resp.php';?>
		<div class="row">
			<div class="col-lg-8">
				<ul class="list-group">
				<?php foreach ($catdata as $m):?> 
					<li class="list-group-item"
						style="border-left: 0; border-right: 0;"><a
						href="<?php echo base_url().'category/'.$m->name;?>"><?php echo $m->displayName;?> </a></li>
				<?php endforeach;?>
				</ul>
			</div>
			<div class="col-lg-4"></div>
		</div>
	</div>

 </div>
</div>
</div>
