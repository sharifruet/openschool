      <!-- Page Heading -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">OpenSchool Dashboard
                    <small>Choose an item</small>
                </h1>
            </div>
        </div>
        <!-- /.row -->

        <!-- Projects Row -->
        <div class="row">
        	
        <?php foreach ($menu as $m):?>
            <div class="col-md-4 portfolio-item">
                <a href="<?php echo base_url().'home/exam/'.$m->componentId;?>"><?php echo $m->displayName;?></a>
            </div>
         <?php endforeach; ?>

        </div>
        
        <div class="row">
            <div class="col-md-4 portfolio-item">
                <a href="<?php echo base_url().'home/menu/';?>">Menu</a>
            </div>
        </div>