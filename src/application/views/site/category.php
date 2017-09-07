<div class="row">
	<div class="col-md-3">
		<ul class="vnav">
			<?php foreach ($catdata as $m):?> 
				<li style="border-left: 0; border-right: 0;"><a
				href="<?php echo base_url().'category/'.$m->name;?>"><?php echo $m->displayName;?> </a></li>
			<?php endforeach;?>
		</ul>
	</div>

	<div class="col-md-9">

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

	<div class="col-md-3"></div>
</div>