<!-- Page Heading -->
<div class="row">
	<div class="col-lg-12">
  		<h1 class="page-header"><?php echo $page_title;?>
        	<small><?php echo $page_name;?></small>
   		</h1>
   	</div>
</div>
<div class="row">
	
		<?php echo form_open(base_url()."home/record/".$object['name']."/save");?>
		<input type="hidden" name="fieldCount" id="fieldCount" value="1"/>
		<div class="form-group row">
	      <label for="name" class="col-sm-2 col-form-label">Name</label>
	      <div class="col-sm-10">
	       	<label><?php echo $object['name'];?></label>
	      </div>
	    </div>
		
		<div id="dynamic-container">
			<div class="form-group row">
				<div class="col-sm-6">
					<?php foreach ($object['fields'] as $field):?>
					<div class="form-group row">
					
				      	<label for="field1" class="col-sm-3 col-form-label"><?php echo $field->fieldName;?></label>
				      	<div class="col-sm-9">
						    <textarea class="form-control" name="FLD<?php echo $field->componentId;?>" ></textarea>
						</div>
				      	
					</div>
					<?php endforeach;?>
				</div>
				<div class="col-sm-6">
					<div class="form-group row">
						<div class="col-sm-8">
							<ul class="list-group">
							<?php foreach ($tags as $tag):?>
								<li class="list-group-item" style="padding-left:  <?php echo substr_count ($tag->hierarchyPath , '--')*30; ?>px;">
									<?php echo $tag->displayName;?>
								</li>
							<?php endforeach;?>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="form-group row">
			<div class="col-sm-4">
				<button type="submit" class="btn btn-default" name="button"> Save </button>
			</div>
		</div>
		<?php echo form_close();?>
	
</div> 


<div class="row">
	<table class="table">
		<thead>
			<tr>
				<?php foreach ($object['fields'] as $field):?>
				<th><?php echo $field->fieldName;?></th>
				<?php endforeach;?>
			
				<th>&nbsp;</th>
			</tr>
		</thead>
		<tbody>
	
		<?php foreach ($records as $recordId=>$record):?>
			<tr>
				<?php foreach ($object['fields'] as $field): ?>
				<td>
					<?php echo $record[$field->componentId];?>
			 		 <a data-toggle="modal" class="glyphicon glyphicon-pencil" data-recordid="<?php echo $recordId;?>" data-fieldid="<?php echo $field->componentId;?>" data-title="<?php echo $field->fieldName;?>" data-content="<?php echo $record[$field->componentId];?>" href="#myModal"></a>
			 		 
				</td>
				<?php endforeach;?>
			
				<td>
					<a href="<?php echo base_url().'home/record/'.$object['name'].'/delete/'.$recordId; ?>" class="glyphicon glyphicon-trash" aria-hidden="true"></a> 
				
				
				</td>
			</tr>
		<?php endforeach;?>
		</tbody>
	</table>
</div>


<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 id="mdl-hdr" class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body">
      	<?php echo form_open(base_url()."home/record/".$object['name']."/update");?>
      	
      	<div class="form-group row">
			
		   <label for="field1" class="col-sm-2 col-form-label"><?php echo $field->fieldName;?></label>
		    <div class="col-sm-6">
				<textarea name="fieldName" class="form-control" rows="2" cols="20"></textarea>
				<input type="hidden" name="fieldId"/>
				<input type="hidden" name="recordId"/>
			</div>
		      	
		</div>
      	<div class="form-group row">
			
		   <label for="field1" class="col-sm-2 col-form-label">&nbsp;</label>
		    <div class="col-sm-6">
				<button type="submit" class="btn btn-default">Update</button>
			</div>
		      	
		</div>
      	
      	<?php form_close();?>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

<script type="text/javascript">
$(document).ready(function(){
	$('#myModal').on('show.bs.modal', function(e) {
		 var content = $(e.relatedTarget).data('content');
		 var fieldId = $(e.relatedTarget).data('fieldid');
		 var recordId = $(e.relatedTarget).data('recordid');
		 var title = $(e.relatedTarget).data('title');
		 $('#mdl-hdr').html(title);
		 $(e.currentTarget).find('textarea[name="fieldName"]').html(content);
		 $(e.currentTarget).find('input[name="fieldId"]').val(fieldId);
		 $(e.currentTarget).find('input[name="recordId"]').val(recordId);
	});
});
</script>
