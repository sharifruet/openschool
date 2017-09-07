<!-- Page Heading -->
<?php echo form_open('/home/add/save');?>
<?php $this->load->view('templates/types/mcq.php');?>

<div class="row">
	<div class="col-md-12 portfolio-item">
		<input type="submit" class="btn btn-default" value="Submit"/>
	</div>
</div>
<?php echo form_close();?>