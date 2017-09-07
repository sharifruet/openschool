        <!-- Page Heading -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">OpenSchool Items
                    <small>Question and answer</small>
                </h1>
            </div>
        </div>
        <!-- /.row -->

        <!-- Projects Row -->
        <div class="row">
        	<?php echo form_open(base_url().'pages/save/QuestionAnswer/save'); ?>
	            <div class="col-md-4 portfolio-item">
	            	Question :<br/>
	                <textarea name="question" style="width: 100%;"></textarea>
	            </div>
	            
	            <div class="col-md-4 portfolio-item">
	            	Answer :<br/>
	               <textarea name="answer" style="width: 100%;"></textarea>
	            </div>
	            
	            <div class="col-md-4 portfolio-item">
	            	<br/>
	                <input type="submit" name="submit" value=" Save "/>
	            </div>
            
            <?php echo form_close();?>

        </div>
        <!-- /.row -->

        

        <hr>
		
        <!-- Pagination -->
        <!--
        <div class="row text-center">
            <div class="col-lg-12">
                <ul class="pagination">
                    <li>
                        <a href="#">&laquo;</a>
                    </li>
                    <li class="active">
                        <a href="#">1</a>
                    </li>
                    <li>
                        <a href="#">2</a>
                    </li>
                    <li>
                        <a href="#">3</a>
                    </li>
                    <li>
                        <a href="#">4</a>
                    </li>
                    <li>
                        <a href="#">5</a>
                    </li>
                    <li>
                        <a href="#">&raquo;</a>
                    </li>
                </ul>
            </div>
        </div>
          -->
        <!-- /.row -->

        <hr>
