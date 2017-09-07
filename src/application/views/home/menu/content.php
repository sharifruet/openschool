<!-- Page Heading -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"><?php echo $page_title; ?>
                    <small><?php echo $page_name; ?></small>
                </h1>
            </div>
        </div>
        <!-- /.row -->

        <!-- Projects Row -->
        <div class="row">
        	<?php 
        	$name = '';
        	$displayName = '';
        	$appender='';
        	$parent = $parentId;
        	$isEnd = 1;
        	if($selectedMenu != null){
        		$name = $selectedMenu->name;
        		$displayName = $selectedMenu->displayName;
        		$parent = $selectedMenu->parentId;
        		$isEnd = $selectedMenu->isEnd;
        		$appender = '/'.$selectedMenu->componentId;
        	}
        	?>
        	<?php echo form_open(base_url().'home/menu/save'.$appender); ?>
	            <div class="col-md-3 portfolio-item">
	            	Name :<br/>
	                <input name="name" value="<?php echo $name;?>"/>
	            </div>
	            
	            <div class="col-md-3 portfolio-item">
	            	Display name :<br/>
	               <input name="displayName" value="<?php echo $displayName;?>"/>
	            </div>
	            
	            <div class="col-md-3 portfolio-item">
	            	Parent :<br/>
	               <select name="parentId">
	               	<option value = "0"> -- Select -- </option>
	               	<?php foreach ($groupMenu as $m):?>
	               	<option <?php echo $parent==$m->componentId?"selected":"";?> value="<?php echo $m->componentId;?>"> <?php echo $m->displayName;?> </option>
	               	<?php endforeach;?>
	               </select>
	            </div>
	            
	            <div class="col-md-3 portfolio-item">
	              <input type="hidden" name="isEnd" value="0"/>
	              <input type="checkbox" <?php echo $isEnd == 1?"checked":"";?> name="isEnd" value="1"/>
	              <label for="isEnd">Is end level</label><br/>
	              <input type="submit" class="btn btn-default" name="submit" value=" Save "/>
	            </div>

            
            <?php echo form_close();?>

        </div>
        <!-- /.row -->
        
        <!-- Projects Row -->
        <div class="row">
        	<?php echo form_open(base_url().'home/menu/search'.$appender); ?>
	            <div class="col-md-3 portfolio-item">
	            	Parent :<br/>
	               <select name="parentId">
	               	<option value = "-1"> -- Select -- </option>
	               	<?php foreach ($groupMenu as $m):?>
	               	<option <?php echo $parent==$m->componentId?"selected":"";?> value="<?php echo $m->componentId;?>"> <?php echo $m->displayName;?> </option>
	               	<?php endforeach;?>
	               </select>
	            </div>
	            
	            <div class="col-md-3 portfolio-item">
	              <input type="submit" class="btn btn-default" name="submit" value=" Filter "/>
	            </div>

            
            <?php echo form_close();?>

        </div>
        <!-- /.row -->
        
         <!-- Projects Row -->
        <div class="row">
        	<table class="table table-hover data-table" style="width: 100%;">
        		<thead>
        			<tr>
        				<th>ID</th>
        				<th>Name</th>
        				<th>Display Name</th>
        				<th>Parent</th>
        				<th>Is End</th>
        				<th>Operation</th>
        			</tr>
        		</thead>
        		<tbody>
        			<?php foreach ($allMenu as $m):?>
        			<tr>
        				<td><?php echo $m->componentId;?></td>
        				<td><?php echo $m->name;?></td>
        				<td><?php echo $m->displayName;?></td>
        				<td><?php echo $m->parentId;?></td>
        				<td><?php echo $m->isEnd==1?'Yes':'No';?></td>
        				<td>
            				<a href="<?php echo base_url().'home/menu/delete/'.$m->componentId; ?>" class="glyphicon glyphicon-trash" aria-hidden="true"></a>
								&nbsp;
							<a href="<?php echo base_url().'home/menu/edit/'.$m->componentId; ?>" class="glyphicon glyphicon-edit" aria-hidden="true"></a>
            			</td>
        			</tr>
        			 <?php endforeach;?>
        		</tbody>
        	</table>

        </div>
        <!-- /.row -->
        