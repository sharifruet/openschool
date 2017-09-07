<?php $this->load->view('templates/loginheader.php');?>

	<div id="loginbox">
		<section id="content">

			<?php echo form_open('login/authenticate');?>
			
			 <div class="row">
            	<div class="col-lg-12">
                	<h1 class="page-header">OpenSchool Login
                    	<small>Enter username and password to login</small>
                	</h1>
            	</div>
        	</div>
        <!-- /.row -->

        <!-- Projects Row -->
	        <div class="row">
	            <div class="col-md-4 portfolio-item">
	            </div>
	             <div class="col-md-4 portfolio-item">
	             	<input type="text" placeholder="Username" id="username" name="username"/>
	             	<br/><br/>
	             	<input type="password" placeholder="Password" id="password" name="password"/>
	             	<br/><br/>
	             	<input type="submit" value="Log in" name="submit"/>
	            </div>
	             <div class="col-md-4 portfolio-item">
	            </div>
	        </div>


<?php $this->load->view('templates/footer.php');?>