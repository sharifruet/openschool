<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="বিসিএস, BCS, Bangladesh, Civil, Service, PSC, preliminary,General Knowleddge, বিসিএস, চাকূরী , School, Primary, Coaching, Tution, Education, Stud">
    <meta name="description" content="This portal is contains contents for School Syllabus, General Knowledge, BCS and other job related examinationn preperation">
    <meta name="author" content="Sharif Uddin">

    <title> <?php echo isset($pageTitle)?$pageTitle." | ":"";?> OpenSchool - Knowledge for all</title>

    <!-- Bootstrap Core CSS -->
    <link rel="shortcut icon" type="image/ico" href="/favicon.ico"/>
    <link href="<?php echo base_url(); ?>resources/css/bootstrap.min.css" rel="stylesheet">
    
	<link href="https://cdn.datatables.net/1.10.12/css/dataTables.bootstrap.min.css" rel="stylesheet"/>
    <!-- Custom CSS -->
    <link href="<?php echo base_url(); ?>resources/css/4-col-portfolio.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<link href="<?php echo base_url(); ?>resources/css/site.css" rel="stylesheet">
 <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="<?php echo base_url(); ?>resources/js/bootstrap.min.js"></script>
</head>

<body style="padding: 0px;">
    <!-- Navigation -->
    <nav class="navbar navbar-default">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="col-sm-9 col-md-9">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="<?php echo base_url();?>"> 
                	<img alt="" style="float:left; height: 55px;margin-bottom: 0px; padding: 1px 5px;" src="<?php echo base_url(); ?>resources/images/logo.png"/>
					<label class="navbar-brand"><span style="color:green;">OPEN</span><span style="color:black;">SCHOOL</span></label>
                	
                </a>
            </div>
            
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                	<?php foreach ($menu as $m):?>
                    <li>
                        <a href="<?php echo base_url().'category/'.$m->name;?>"><?php echo $m->displayName;?></a>
                    </li>
                    <?php endforeach;?>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
            </div>
            <div class="col-sm-3 col-md-3">
		        <form class="navbar-form" role="search">
		        <div class="input-group">
		            <input type="text" class="form-control" placeholder="Search" name="q">
		            <div class="input-group-btn">
		                <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
		            </div>
		        </div>
		        </form>
		    </div>
	    
        </div>
        <!-- /.container -->
         
    </nav>
    <?php if(isset($hierarchy)){?>
    <nav class="breadcrumb">
    	<div class="container">
	    	<?php for ($i = count($hierarchy) - 1; $i>0;$i-- ){
		    	$h = $hierarchy[$i];
		    ?>
		     <a class="breadcrumb-item" href="<?php echo base_url().'category/'.$h->name;?>"><?php echo $h->displayName;?></a> /
		    <?php };
		    if(count($hierarchy)>0){
		    	$h = $hierarchy[0];
		    ?>
		  	<span class="breadcrumb-item active"><?php echo $h->displayName;?></span>
		  <?php }?>
	  	</div>
	</nav>
	<?php }?>
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-58d4b21651b2cd0c"></script>
    
    <!-- Page Content -->
   <div class="container">
   
		<div class="row">
			<div class="col-lg-12">
		   		<h1 class="page-header">Welcome!!!
		        	<small>Welcome to OpenSchool</small>
		  		</h1>
			</div>
		</div>