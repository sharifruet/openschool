
<div class="row">
	<div class="col-lg-12">
		<p>
			OpenSchool is a place of learning. From here you can learn based on your interest and necessity. Here various study materials are available from pre-school to higher study, study for pleasure to job oriented study. Our mission is to enhich your knowledge level by making logical presentation and easy accesibility to study materials.
		</p>
		<p>
			OpenSchool শেখার জায়গা। এখানে আপনি আপনার পছন্দ এবং প্রয়োজন অনুযায়ী শিখতে পারেন, নিজের জানার পরিধি বাড়াতে পারেন, এবং যাচাই করতে পারেন। প্রাক-প্রাথমিক থেকে উচ্চশিক্ষা, আনন্দের জন্য শিক্ষা থেকে চাকুরীর জন্য শিক্ষা; সব রকমের শিক্ষা উপকরণে সমৃদ্ধ এই সাইট । শিক্ষা উপকরণকে যৌক্তিক উপায়ে উপস্থাপন এবং সহজলভ্যকরণের মাধ্যমে মানুষকে অধিকতর শিক্ষিত করার প্রয়াসই আমাদের লক্ষ্য।
		</p>
	</div>
</div> 

<?php require_once 'ads/hz1.php';?>
<div class="row">
	<h2><span class="label label-primary">Education news | শিক্ষা সংবাদ</span></h2>
</div>
<div class="row">
	<?php foreach ($articles as $article):?> 
	<div class="col-lg-6">
		<p><?php echo $article->createdDate;?></p>
		<h4><?php echo $article->title;?></h4>
		<p><?php echo $article->leadtext;?> 
		<a href="/d/ar/<?php echo $article->componentId;?>/<?php echo substr($article->title,0,100);?>"> more ...</a>
		
	</div>
	<?php endforeach;?>
</div>
<div class="row">
<?php foreach ($menu as $m):?>     
	<div class="col-md-4">
		 <h3><span class="label label-primary"><?php echo $m->displayName;?></span></h3>
		 
		 	<ul>
		 		<?php foreach ($catdata[$m->componentId] as $qes):?>
		 			<li>
		 				<a href="<?php echo base_url().'category/'.$m->name;?>"><?php echo $qes->question;?></a>
		 				<br/><span class="glyphicon glyphicon-ok">	<?php echo $qes->answer;?></span>
		 			</li>
		 		<?php endforeach;?>
		 	</ul>
		 
		 <a href="<?php echo base_url().'category/'.$m->name;?>"><span>Read more</span> <span class="glyphicon glyphicon-menu-right">&nbsp;</span> </a>
	</div>
<?php endforeach;?>
</div>