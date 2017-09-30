


<?php require_once 'ads/hz1.php';?>

<div class="row">
	<?php foreach ($result as $rs):?>
		 	<div class="col-md-12">
		 		<a href="<?php echo base_url().'category/'.$rs->componentId;?>"><?php echo $rs->question;?></a>
		 		<br/><span class="glyphicon glyphicon-ok">	<?php echo $rs->answer;?></span>
		 	</div>
	<?php endforeach;?>
</div>