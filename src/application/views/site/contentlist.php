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
			
	</div>
	<div class="col-md-3"></div>
</div>