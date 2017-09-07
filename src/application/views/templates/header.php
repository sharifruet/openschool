<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Regular School curriculam, General Knowledge, BCS and other job related examinationn preperation">
    <meta name="keyword" content="BCS, Bangladesh, Civil, Service, PSC, preliminary,General Knowleddge, বিসিএস, চাকূরী ">
    <meta name="author" content="">

    <title>OpenSchool - Knowledge for all</title>

    <!-- Bootstrap Core CSS -->
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
	    <!-- jQuery -->
	 <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="<?php echo base_url(); ?>resources/js/bootstrap.min.js"></script>
</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="<?php echo base_url().'home/dashboard'?>"> 
                	<img alt="" style="float:left; height: 70px;margin-bottom: -40px; padding: 1px 5px;" src="<?php echo base_url(); ?>resources/images/os.png"/>
					<label class="navbar-brand">OPENSCHOOL</label>
                	
                </a>
            </div>
            
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="<?php echo base_url();?>home/menu">Menu</a>
                    </li>
                </ul>
                
                <ul class="nav navbar-nav navbar-right">
			      <li><a href="#"><span class="glyphicon glyphicon-user"></span> Hello, <?php echo $loggedInUserName." (" . $userName . ")";?></a></li>
			      <li><a href="<?php echo base_url().'login/logout'?>"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
			    </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    <?php if(isset($hierarchy)){?>
    <nav class="breadcrumb">
    	<div class="container">
	    	<?php for ($i = count($hierarchy) - 1; $i>0;$i-- ){
		    	$h = $hierarchy[$i];
		    ?>
		     <a class="breadcrumb-item" href="<?php echo base_url().'home/exam/'.$h->componentId;?>"><?php echo $h->displayName;?></a> /
		    <?php };
		    if(count($hierarchy)>0){
		    	$h = $hierarchy[0];
		    ?>
		  	<span class="breadcrumb-item active"><?php echo $h->displayName;?></span>
		  <?php }?>
	  	</div>
	</nav>
	<?php }?>
    
    <!-- Page Content -->
   <div class="container">