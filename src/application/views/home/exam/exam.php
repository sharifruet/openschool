<!-- Page Heading -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">OpenSchool Items
                    <small>Choose an item</small>
                </h1>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6 portfolio-item">
	            <?php if($end){ 
	            	$qes = '';
	            	$ans = '';
	            	$appender='';
	            	
	              	if($question != null){
	              		$qes = $question->question;
	              		$ans = $question->answer;
	              		$appender = '/'.$question->componentId;
	              	}
	 			  echo form_open(base_url().'home/exam/'.$examId.'/save'.$appender, 'method=post');?>
	              
	               <p>
	               	<label for="question" >Question</label><br/>
	               	<textarea name="question" style="width: 100%;"><?php echo $qes;?></textarea>
	               </p>
	               <p>
	                <label for="answer" >Answer</label><br/>
	                <textarea name="answer" style="width: 100%;"><?php echo $ans;?></textarea>
	               </p>
	                <p>
	                <input type="submit" value=" SAVE "/>
	               </p>
	              
	              <?php echo form_close();?>
	              
	            <?php }else{?>
             	<ul>
                <?php foreach ($subMenu as $m):  ?>
                   <li>
                   		<a href="<?php echo base_url().'home/exam/'.$m->componentId;?>"><?php echo $m->componentId . '. '. $m->displayName;?></a>
                    </li>
                    <?php
                    endforeach;
                    ?>
             	</ul>
                <?php }?>
           
            </div>
            <div class="col-md-6 portfolio-item">
            <?php if($end){ ?>
            	<table class="table table-hover data-table" style="width: 100%;">
            		<thead>
            			<tr>
            				<th>ID</th>
            				<th>Question</th>
            				<th>Answer</th>
            				<th>Operation</th>
            			</tr>
            		</thead>
            		<tbody>
            			<?php foreach ($records as $record):  ?>
            			<tr>
            				<td><?php echo $record->componentId;?></td>
            				<td><?php echo $record->question;?></td>
            				<td><?php echo $record->answer;?></td>
            				<td>
            					<a href="<?php echo base_url().'home/exam/'.$examId.'/delete/'.$record->componentId; ?>" class="glyphicon glyphicon-trash" aria-hidden="true"></a>
								&nbsp;
								<a href="<?php echo base_url().'home/exam/'.$examId.'/edit/'.$record->componentId; ?>" class="glyphicon glyphicon-edit" aria-hidden="true"></a>
            				</td>
            			</tr>
            			<?php endforeach;?>
            		</tbody>
            	</table>
            <?php } ?>
        	</div>
           

        </div>