<!-- Page Heading -->
<div class="row">
	<div class="col-lg-12">
  		<h1 class="page-header"><?php echo $page_title;?>
        	<small><?php echo $page_name;?></small>
   		</h1>
   	</div>
</div>
<div class="row">
	
		<?php echo form_open(base_url()."home/object/save");?>
		<input type="hidden" name="fieldCount" id="fieldCount" value="1"/>
		<div class="form-group row">
	      <label for="name" class="col-sm-2 col-form-label">Name</label>
	      <div class="col-sm-10">
	       	<input type="text" class="form-control" id="name"  name="name" placeholder="mcq">
	      </div>
	    </div>
	    
	    <div class="form-group row">
	      <label for="name" class="col-sm-2 col-form-label">Display Name</label>
	      <div class="col-sm-10">
	       	<input type="text" class="form-control" id="displayName"  name="displayName" placeholder="Multi Options">
	      </div>
	    </div>
		
		<div id="dynamic-container">
			<div id="row1" class="form-group row">
		      	<label for="field1" class="col-sm-2 col-form-label">Field</label>
		      	<div class="col-sm-4">
				    <input type="text" class="form-control" id="field1"  name="field1" placeholder="name">
				</div>
		      	<label for="type1" class="col-sm-2 col-form-label">Data Type</label>
		      	<div class="col-sm-4">
		      		<select  class="form-control" id="type1"  name="type1">
		      			<?php foreach ($datatypes as $type):?>
		      			<option value="<?php echo $type->componentId;?>"><?php echo $type->uniqueCode;?></option>
		      			<?php endforeach;?>
		      		</select>
				    
				</div>
			</div>
		</div>
		
		<div class="form-group row">
			<div class="col-sm-4">
				<button type="button" class="btn btn-default" onclick="addMore();" name="button"> Add + </button>
				<button type="button" class="btn btn-default" onclick="remove();" name="button"> Remove - </button>
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
				<th>Object</th>
				<th>
					<table style="width:100%;">
						<tr><td colspan="2">Fields</td></tr>
						<tr>
							<td style="width:70%;">Field Name</td>
							<td style="width:30%;">Field Id</td>
						</tr>
					</table>
				</th>
				<th>Operation</th>
			</tr>
		</thead>
		<tbody>
	
	<?php foreach ($objects as $object):?>
			<tr>
				<td><a href="<?php echo base_url();?>home/record/<?php echo $object['name'];?>"><?php echo $object['name'];?></a></td>
				<td>
					<table style="width:100%;">
					<?php foreach ($object['fields'] as $field):?>
						<tr>
							<td style="width:70%;"><?php echo $field->fieldName;?></td>
							<td style="width:30%;"><?php echo $field->componentId;?></td>
						</tr>
					<?php endforeach;?>
					</table>
				</td>
				<td>
					<a href="<?php echo base_url().'home/object/delete/'.$object['name']; ?>" class="glyphicon glyphicon-trash" aria-hidden="true"></a> 
				</td>
			</tr>
	<?php endforeach;?>
		</tbody>
	</table>
</div>


<script type="text/javascript">
 function addMore(){
	 fieldCount = $("#fieldCount").val();
	 
	 fieldCount++;
	 
	 html = "<div id=\"row"+fieldCount+"\" class=\"form-group row\">"+
   	"<label for=\"field1\" class=\"col-sm-2 col-form-label\">Field</label> "+
   "	<div class=\"col-sm-4\"> "+
	"	    <input type=\"text\" class=\"form-control\" id=\"field"+fieldCount+"\"  name=\"field"+fieldCount+"\" placeholder=\"name\"> "+
	"	</div> "+
   	"<label for=\"type1\" class=\"col-sm-2 col-form-label\">Data Type</label> "+
   	"<div class=\"col-sm-4\"> "+
   	"<select  class=\"form-control\" id=\"type"+fieldCount+"\"  name=\"type"+fieldCount+"\">";
	<?php foreach ($datatypes as $type):?>
	html +=	"<option value=\"<?php echo $type->componentId;?>\"><?php echo $type->uniqueCode;?></option>";
	<?php endforeach;?>
	html +=	"</select>"+
	
	"	</div> "+
	"</div>";
	 
	 $('#dynamic-container').append(html);
	 $("#fieldCount").val(fieldCount);
 }
 
 function remove(){
	 fieldCount = $("#fieldCount").val();
	 $('#row'+fieldCount).remove();
	fieldCount--;
	 $("#fieldCount").val(fieldCount);
	 
 }
</script>